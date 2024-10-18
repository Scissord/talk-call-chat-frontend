import { Droppable } from "@hello-pangea/dnd";
import { FC, memo, useMemo } from "react";
import { VariableSizeList } from "react-window";
import { IBoard, IColumn } from "@interfaces";
import { getRandomColor } from "@utils";
import AutoSizer from 'react-virtualized-auto-sizer';
import Card from "./Card";
import './scroll.css';

const css = {
  container: `
    column bg-neutral-100 dark:bg-dcolumn
    py-2 px-2 rounded overflow-hidden

  `,
  top_column: `
    flex flex-col gap-2 mb-2
  `,
  cardLength: `
    text-black dark:text-white text-xs
  `,
  card: `
    select-none p-2 bg-card dark:bg-dcard
    text-[13px] text-black dark:text-white
    relative z-10 overflow-hidden
    flex items-center gap-3 border border-slate-200
    dark:border-neutral-700 rounded shadow-lg
  `,
  title: `
    text-sm text-black dark:text-white
    font-bold tracking-widest
  `,
};

type ColumnProps = {
  columnId: string;
  board: IBoard;
  deleteCard: (card_id: string, column_id: string) => void;
  toggleFixCard: (card_id: string) => void;
};

const Column: FC<ColumnProps> = memo((props) => {
  const { board, columnId, deleteCard, toggleFixCard } = props;

  const column = (board.columns as { [key: string]: IColumn })[columnId];

  const cards = useMemo(() => {
    return Object.values(board.cards)
      .filter((card) => +card.manager_id === +column.manager_id)
      .sort((a, b) => {
        if (a.isfixed === b.isfixed) {
          const dateA = new Date(a.last_message_date).getTime();
          const dateB = new Date(b.last_message_date).getTime();
          return dateB - dateA;
        }

        return a.isfixed ? -1 : 1;
      });
  }, [board, column.manager_id]);


  return (
    <div className={css.container}>
      <div className={css.top_column}>
        <h3 className={css.title}>{column.title}</h3>
        <p className={css.cardLength}>{cards?.length || 0}</p>
        <div className={`border w-full ${getRandomColor()}`}></div>
      </div>
      <Droppable
        mode="virtual"
        droppableId={column.id}
        renderClone={(provided, snapshot, rubric) => {
        const card = cards[rubric.source.index];
          return (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{ ...provided.draggableProps.style }}
            >
              <div className={css.card}>
                <img
                  src={card?.avatar ? card?.avatar : 'pics/default_avatar.png'}
                  className='w-10 h-10 rounded-full'
                  alt="avatar"
                />
                <div className='flex flex-col w-full text-xs'>
                  <div className='flex items-center justify-between w-full'>
                    <p>{card?.order_id}</p>
                    <p>{card?.time}</p>
                  </div>
                  <div className='flex items-center justify-between w-full'>
                    <p className='font-bold'>
                      {card?.name?.length > 15? card?.name?.slice(0, 14) : card?.name}
                    </p>
                    <div className='ml-auto'>
                      <img
                        src={card?.path}
                        className='w-6'
                        alt="product"
                      />
                    </div>
                  </div>
                  <div className='flex items-center mt-2'>
                    <img
                      src={'pics/whatsapp_logo.webp'}
                      className='w-4 rounded-full'
                      alt="whatsapp"
                    />
                    {card?.text && <p className='rounded'>
                      {card?.text.length > 10 ? card.text.slice(0, 10) + '...' : card?.text}
                    </p>}
                    {card?.counter !== 0 && <p className='ml-auto text-[8px] w-3 h-3 bg-[#646dff] rounded-full text-white flex items-center justify-center'>
                      {card?.counter}
                    </p>}
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      >
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="h-full w-full">
            <AutoSizer disableWidth>
              {({ height }) => (
                <VariableSizeList
                  height={height}
                  width={250}
                  itemCount={cards.length}
                  itemSize={() => 90}
                  itemData={cards}
                  outerRef={provided.innerRef}
                  className="column"
                >
                {({ data, index, style }) => (
                  <Card
                    index={index}
                    style={style}
                    data={data}
                    deleteCard={deleteCard}
                    toggleFixCard={toggleFixCard}
                  />
                )}
                </VariableSizeList>
              )}
            </AutoSizer>
          </div>
        )}
      </Droppable>
    </div>
  );
});

export default Column;
