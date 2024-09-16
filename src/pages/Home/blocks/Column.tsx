import { FC } from 'react'
import { IBoard, ICard, IColumn } from '@interfaces';
import { Droppable } from '@hello-pangea/dnd';
import Card from './Card';
import './scroll.css';

type ColumnProps = {
  columnId: string;
  board: IBoard;
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
    columnId, board,
  } = props;

  const column = (board.columns as { [key: string]: IColumn })[columnId];
  let cards: ICard[] = [];
  if(column.cardsIds){
    cards = column?.cardsIds
      .map((cardId: string) => (board.cards as { [key: string]: ICard })[cardId])
      .filter((card: ICard) => card);
  };

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
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default Column