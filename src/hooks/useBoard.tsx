import axios from '@axios';
import { IBoard, ICard, IColumn, ICustomer } from '@interfaces';
import { useEffect, useState } from 'react';
import { DragStart, DropResult } from '@hello-pangea/dnd';
import { useSocketContext } from '@context';
import { useAppSelector } from '@hooks';
import { RootState } from '@store/index';
import { getUser } from '@store/reducers/authSlice';

export const useBoard = () => {
  const { socket, newCardSpot, newMessage } = useSocketContext();
  const user = useAppSelector((state: RootState) => getUser(state));

  const [board, setBoard] = useState<IBoard>({
    columns: {},
    cards: {},
    order: [],
  });

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getBoard();
  }, [])

  useEffect(() => {
    if(newCardSpot) {
      const startColumn = (board.columns as { [key: string]: IColumn })[newCardSpot.source.droppableId];
      const finishColumn = (board.columns as { [key: string]: IColumn })[newCardSpot.destination.droppableId];
      if (startColumn === finishColumn) {
        sameColumn(startColumn, newCardSpot.source, newCardSpot.destination, newCardSpot.customer_id);
        return;
      }
      differentColumns(startColumn, newCardSpot.source, finishColumn, newCardSpot.destination, newCardSpot.customer_id);
    };
  }, [newCardSpot]);

  useEffect(() => {
    if(newMessage?.customer_id) {
      handleRaiseCustomer(newMessage?.customer_id.toString());
    };
  }, [newMessage]);

  const getBoard = async () => {
    setLoading(true);
    await axios({
      method: 'GET',
      url: `/board`,
    }).then((res) => {
      setLoading(false);
      setBoard(res.data)
    });
  };

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (user && socket && socket.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({
        type: "onDragEnd",
        customer_id: draggableId,
        user_id: user.id,
        destination,
        source
      });

      socket.send(message);
      console.log(`Message sent: ${message}`);
    } else {
      console.log('WebSocket is not connected');
    };

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    };

    const startColumn = (board.columns as { [key: string]: IColumn })[source.droppableId];
    const finishColumn = (board.columns as { [key: string]: IColumn })[destination.droppableId];

    if (startColumn === finishColumn) {
      sameColumn(startColumn, source, destination, draggableId);
      await axios({
        method: 'PATCH',
        url: `/cards/${draggableId}/move`,
        data: {
          cardId: draggableId,
          sourceColumnId: startColumn.id,
          destinationColumnId: startColumn.id,
          sourceIndex: source.index,
          destinationIndex: destination.index,
        },
        withCredentials: true,
      })

      return;
    };

    differentColumns(startColumn, source, finishColumn, destination, draggableId);
    await axios({
      method: 'PATCH',
      url: `/cards/${draggableId}/move`,
      data: {
        cardId: draggableId,
        sourceColumnId: startColumn.id,
        destinationColumnId: finishColumn.id,
        sourceIndex: source.index,
        destinationIndex: destination.index,
      },
      withCredentials: true,
    })
  };

  const onDragStart = (result: DragStart) => {
    const { draggableId } = result;

    if (user && socket && socket.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({
        type: "onDragStart",
        customer_id: draggableId,
        user_id: user.id
      });

      socket.send(message);
      console.log(`Message sent: ${message}`);
    } else {
      console.log('WebSocket is not connected');
    };
  };

  const sameColumn = (startColumn: any, source: any, destination: any, draggableId: string) => {
    const newCardIds = Array.from(startColumn?.cardsIds);
    newCardIds.splice(source.index, 1);
    newCardIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...startColumn,
      cardsIds: newCardIds,
    };

    setBoard({
      ...board,
      columns: {
        ...board.columns,
        [newColumn.id]: newColumn,
      },
    });
  };

  const differentColumns = (startColumn: any, source: any, finishColumn: any, destination: any, draggableId: string) => {
    const startCardIds = Array.from(startColumn?.cardsIds);
    startCardIds.splice(source.index, 1);
    const newStartColumn = {
      ...startColumn,
      cardsIds: startCardIds,
    };

    const finishCardIds = Array.from(finishColumn?.cardsIds);
    finishCardIds.splice(destination.index, 0, draggableId);
    const newFinishColumn = {
      ...finishColumn,
      cardsIds: finishCardIds,
    };

    const updatedCard = {
      ...(board.cards as { [key: string]: ICard })[draggableId],
      manager_id: finishColumn.manager_id,
    };

    setBoard({
      ...board,
      cards: {
        ...board.cards,
        [draggableId]: updatedCard,
      },
      columns: {
        ...board.columns,
        [newStartColumn.id]: newStartColumn,
        [newFinishColumn.id]: newFinishColumn,
      },
    });
  };

  const handleRaiseCustomer = (customer_id: string) => {
    const targetColumnId = Object.keys(board.columns).find(columnId => {
      return (board.columns as { [key: string]: IColumn })[columnId]?.cardsIds.includes(customer_id);
    });

    if (targetColumnId) {
      const column = (board.columns as { [key: string]: IColumn })[targetColumnId];

      column.cardsIds = column?.cardsIds.filter(id => +id !== +customer_id);
      column.cardsIds.unshift(customer_id);

      setBoard({
        ...board,
        columns: {
          ...board.columns,
          [targetColumnId]: column,
        },
      });
    };
  };

  return {
    board,
    onDragEnd,
    onDragStart,
    loading
  };
};
