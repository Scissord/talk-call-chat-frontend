import axios from '@axios';
import { IBoard, IColumn } from '@interfaces';
import { useEffect, useState } from 'react';
import { DropResult } from '@hello-pangea/dnd';

export const useBoard = () => {
  const [board, setBoard] = useState<IBoard>({
    columns: {},
    cards: {},
    order: [],
  });

  useEffect(() => {
    getBoard();
  }, [])

  const getBoard = async () => {
    await axios({
      method: 'GET',
      url: `http://localhost:8080/api/board`,
    }).then((res) => setBoard(res.data));
  };

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    };

    if (type === "column") {
      const newColumnOrder = Array.from(board.order);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      setBoard({ ...board, order: newColumnOrder });
      return;
    };

    const startColumn = (board.columns as { [key: string]: IColumn })[source.droppableId];
    const finishColumn = (board.columns as { [key: string]: IColumn })[destination.droppableId];


    if (startColumn === finishColumn) {
      const newCardIds = Array.from(startColumn.cardsIds);
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

      await axios({
        method: 'PATCH',
        url: `http://localhost:8080/api/cards/${draggableId}/move`,
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
    }

    const startCardIds = Array.from(startColumn.cardsIds);
    startCardIds.splice(source.index, 1);
    const newStartColumn = {
      ...startColumn,
      cardsIds: startCardIds,
    };

    const finishCardIds = Array.from(finishColumn.cardsIds);
    finishCardIds.splice(destination.index, 0, draggableId);
    const newFinishColumn = {
      ...finishColumn,
      cardsIds: finishCardIds,
    };

    setBoard({
      ...board,
      columns: {
        ...board.columns,
        [newStartColumn.id]: newStartColumn,
        [newFinishColumn.id]: newFinishColumn,
      },
    });

    await axios({
      method: 'PATCH',
      url: `http://localhost:8080/api/cards/${draggableId}/move`,
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

  return {
    board,
    onDragEnd,
  };
};
