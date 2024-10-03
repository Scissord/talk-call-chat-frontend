import axios from '@axios';
import { IBoard, ICard, IColumn } from '@interfaces';
import { useEffect, useState, useCallback, KeyboardEvent } from 'react';
import { DragStart, DropResult } from '@hello-pangea/dnd';
import { useSocketContext, useViewContext } from '@context';
import { useAppSelector, useNavigate } from '@hooks';
import { RootState } from '@store/index';
import { getUser } from '@store/reducers/authSlice';

export const useBoard = () => {
  const { socket, newCardSpot, newMessage } = useSocketContext();
  const navigate = useNavigate();
  const context = useViewContext();
  const user = useAppSelector((state: RootState) => getUser(state));

  const [board, setBoard] = useState<IBoard>({
    columns: {},
    cards: {},
    order: [],
  });

  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const inputValue = (e.target as HTMLInputElement).value;
      const cards = board?.cards as { [key: string]: ICard };

      if (cards) {
        const card = Object.values(cards).find(card => +card.order_id === +inputValue);
        if(card) {
          navigate("/chats", { state: { customer: card } });
        } else {
          context?.notification.show('Пользователь не найден', 'error');
        };
      } else {
        context?.notification.show('Пользователь не найден', 'error');
      };
    };
  };

  const getBoard = useCallback(async () => {
    setLoading(true);
    await axios({
      method: 'GET',
      url: '/board',
    }).then((res) => {
      setLoading(false);
      setBoard(res.data);
    });
  }, []);

  const deleteCard = useCallback(async (card_id: string, column_id: string) => {
    const confirm = window.confirm('Вы уверены?')
    if(!confirm) return;
    await axios({
      method: 'DELETE',
      url: `/cards/${card_id}`,
      data: {
        column_id
      },
    }).then(() => {
      const { [card_id]: deletedCard, ...newCards } = board.cards as { [key: string]: ICard };

      setBoard(prevBoard => ({
        ...prevBoard,
        cards: newCards,
      }));
    });
  }, [board.cards]);

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  useEffect(() => {
    if (newCardSpot?.source?.droppableId && newCardSpot?.destination?.droppableId) {
      const startColumn = (board.columns as { [key: string]: IColumn })[newCardSpot.source.droppableId];
      const finishColumn = (board.columns as { [key: string]: IColumn })[newCardSpot.destination.droppableId];

      if (startColumn === finishColumn) {
        sameColumn(startColumn, newCardSpot.source, newCardSpot.destination, newCardSpot.customer_id);
      } else {
        differentColumns(startColumn, newCardSpot.source, finishColumn, newCardSpot.destination, newCardSpot.customer_id);
      }
    }
  }, [newCardSpot, board.columns]);

  useEffect(() => {
    if (newMessage?.customer_id && newMessage?.text) {
      handleRaiseCustomer(newMessage.customer_id.toString(), newMessage.text);
    }
  }, [newMessage]);

  const onDragEnd = useCallback(async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (user && socket && socket.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({
        type: "onDragEnd",
        customer_id: draggableId,
        user_id: user.id,
        destination,
        source,
      });

      socket.send(message);
      console.log(`Message sent: ${message}`);
    } else {
      console.log('WebSocket is not connected');
    }

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const startColumn = (board.columns as { [key: string]: IColumn })[source.droppableId];
    const finishColumn = (board.columns as { [key: string]: IColumn })[destination.droppableId];

    if (startColumn === finishColumn) {
      sameColumn(startColumn, source, destination, draggableId);
      await axios.patch(`/cards/${draggableId}/move`, {
        cardId: draggableId,
        sourceColumnId: startColumn.id,
        destinationColumnId: startColumn.id,
        sourceIndex: source.index,
        destinationIndex: destination.index,
      }, { withCredentials: true });
      return;
    }

    differentColumns(startColumn, source, finishColumn, destination, draggableId);
    await axios.patch(`/cards/${draggableId}/move`, {
      cardId: draggableId,
      sourceColumnId: startColumn.id,
      destinationColumnId: finishColumn.id,
      sourceIndex: source.index,
      destinationIndex: destination.index,
    }, { withCredentials: true });
  }, [board, user, socket]);

  const onDragStart = useCallback((result: DragStart) => {
    const { draggableId } = result;

    if (user && socket && socket.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({
        type: "onDragStart",
        customer_id: draggableId,
        user_id: user.id,
      });

      socket.send(message);
      console.log(`Message sent: ${message}`);
    } else {
      console.log('WebSocket is not connected');
    }
  }, [socket, user]);

  const sameColumn = useCallback((startColumn: IColumn, source: any, destination: any, draggableId: string) => {
    if (startColumn && Array.isArray(startColumn.cardsIds)) {
      const newCardIds = Array.from(new Set(startColumn.cardsIds));

      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        cardsIds: newCardIds,
      };

      setBoard((prevBoard) => ({
        ...prevBoard,
        columns: {
          ...prevBoard.columns,
          [newColumn.id]: newColumn,
        },
      }));
    } else {
      console.error("startColumn или cardsIds не корректно инициализированы.");
    }
  }, []);

  const differentColumns = useCallback((startColumn: IColumn, source: any, finishColumn: IColumn, destination: any, draggableId: string) => {
    if (startColumn && Array.isArray(startColumn.cardsIds) && finishColumn && Array.isArray(finishColumn.cardsIds)) {
      const startCardIds = Array.from(new Set(startColumn.cardsIds));
      startCardIds.splice(source.index, 1);

      const newStartColumn = {
        ...startColumn,
        cardsIds: startCardIds,
      };

      const finishCardIds = Array.from(new Set(finishColumn.cardsIds));
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
    } else {
      console.error("startColumn, finishColumn или их cardsIds не корректно инициализированы.");
    }
  }, [board.cards]);

  const handleRaiseCustomer = useCallback((customer_id: string, text: string) => {
    const targetColumnId = Object.keys(board.columns).find(columnId =>
      (board.columns as { [key: string]: IColumn })[columnId]?.cardsIds.includes(customer_id)
    );

    if (targetColumnId) {
      const column = (board.columns as { [key: string]: IColumn })[targetColumnId];
      column.cardsIds = column?.cardsIds.filter(id => id !== customer_id);
      column.cardsIds.unshift(customer_id);

      const existingCard = (board.cards as { [key: string]: ICard })[customer_id];
      const newCard = {
        ...existingCard,
        text,
        counter: existingCard?.counter ? existingCard.counter + 1 : 1,
      };

      setBoard((prevBoard) => ({
        ...prevBoard,
        columns: {
          ...prevBoard.columns,
          [targetColumnId]: column,
        },
        cards: {
          ...prevBoard.cards,
          [customer_id]: newCard,
        },
      }));
    }
  }, [board]);

  return {
    board,
    onDragEnd,
    onDragStart,
    loading,
    search,
    setSearch,
    handleKeyDown,
    deleteCard
  };
};
