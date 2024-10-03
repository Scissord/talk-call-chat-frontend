import { FC, useMemo } from 'react'
import { IBoard, ICard, IColumn } from '@interfaces';
import { Droppable } from '@hello-pangea/dnd';
import Card from './Card';
import './scroll.css';

type ColumnProps = {
  columnId: string;
  board: IBoard;
  deleteCard: (card_id: string, column_id: string) => void;
};

const css = {
  container: `
    column p-2 bg-column min-w-[245px]
    dark:bg-dcolumn rounded-xl
  `,
  title: `
    text-sm text-center
    text-black dark:text-white
  `,
};

const Column: FC<ColumnProps> = (props) => {
  const {
    columnId, board, deleteCard
  } = props;

  const column = (board.columns as { [key: string]: IColumn })[columnId];
  const cards = useMemo(() => {
    if (column.cardsIds) {
      return column.cardsIds
        .map((cardId: string) => (board.cards as { [key: string]: ICard })[cardId])
        .filter((card: ICard) => card);
    }
    return [];
  }, [column.cardsIds, board.cards]);

  return (
    <Droppable droppableId={column.id}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={css.container}
        >
          <p className={css.title}>{column.title}</p>
          {cards && cards.length > 0 && cards.map((card, index) => (
            <Card
              key={card?.id}
              card={card}
              index={index}
              deleteCard={deleteCard}
              column_id={column.id}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default Column;
