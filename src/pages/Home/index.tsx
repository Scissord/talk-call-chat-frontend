import { ChangeEvent, FC, KeyboardEvent } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { useBoard } from '@hooks';
import { Loader } from '@ui';
import Column from './blocks/Column';

const css = {
  top_section: `
    h-[10vh] flex items-center
    justify-between relative
  `,
  label: `
    text-center w-full text-4xl
    font-semibold text-black dark:text-white
  `,
  bottom_section: `
    h-[90vh] flex py-4
    mx-6 overflow-x-auto
    gap-3 z-50
  `
};

const Home: FC = () => {
  const {
    board,
    onDragEnd,
    onDragStart,
    loading,
    search,
    setSearch,
    handleKeyDown,
    deleteCard
  } = useBoard();

  if(loading) return <Loader
    className='min-h-[100vh] loading-lg'
  />

  return (
    <>
      <section className={css.top_section}>
        <p className={css.label}>Воронка</p>
        <input
          type="text"
          value={search}
          placeholder='Поиск...'
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(e)}
          className='rounded border border-black dark:border-white mr-3 px-2 text-black dark:text-white'
        />
      </section>
      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <section className={css.bottom_section}>
          {board?.order.map((columnId) => (
            <Column
              key={columnId}
              columnId={columnId}
              board={board}
              deleteCard={deleteCard}
            />
          ))}
        </section>
      </DragDropContext>
    </>
  );
};

export default Home;
