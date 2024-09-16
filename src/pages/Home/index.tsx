import { FC } from 'react';
import { useBoard } from '@hooks';
import { DragDropContext } from '@hello-pangea/dnd';
import { Loader } from '@ui';
import Column from './blocks/Column';

const css = {
  top_section: `
    h-[10vh] flex items-center justify-center
  `,
  label: `
    text-center w-full text-4xl
    font-semibold text-black dark:text-white
  `,
  bottom_section: `
    h-[90vh] flex py-4
    container mx-auto
    overflow-x-auto
    gap-3 z-50
  `
};

const Home: FC = () => {
  const {
    board,
    onDragEnd,
    onDragStart,
    loading
  } = useBoard();

  if(loading) return <Loader
    className='min-h-[100vh] loading-lg'
  />

  return (
    <>
      <section className={css.top_section}>
        <p className={css.label}>Воронка</p>
      </section>
      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <section className={css.bottom_section}>
          {board?.order.map((columnId) => (
            <Column
              key={columnId}
              columnId={columnId}
              board={board}
            />
          ))}
        </section>
      </DragDropContext>
    </>
  );
};

export default Home;
