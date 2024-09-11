import { Fragment } from 'react';

const css = {
  top_card: 'w-full sm:w-1/4 bg-white border border-slate-300 rounded-lg h-full overflow-hidden',
  top_card_block: 'h-2/3 flex items-center justify-between px-5',
  top_card_block_right: 'flex flex-col',
  top_card_block_right_title: 'text-[20px]',
  top_card_block_right_description: 'ml-auto text-[24px] font-semibold',
  top_card_bottom_block: 'h-1/3 border-t border-slate-300 flex items-center px-5',
  top_card_bottom_block_title: 'text-[16px] text-gray-400 font-semibold',
}

const cards = [
  {
    icon: <svg
            viewBox="0 0 640 512"
            fill="currentColor"
            height="4em"
            width="4em"
          >
            <path d="M144 160c-44.2 0-80-35.8-80-80S99.8 0 144 0s80 35.8 80 80-35.8 80-80 80zm368 0c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7-1.3 7.2-1.9 14.7-1.9 22.3 0 38.2 16.8 72.5 43.3 96H21.3C9.6 320 0 310.4 0 298.7zM405.3 320h-.7c26.6-23.5 43.3-57.8 43.3-96 0-7.6-.7-15-1.9-22.3 13.6-6.3 28.7-9.7 44.6-9.7h42.7c58.9 0 106.7 47.8 106.7 106.7 0 11.8-9.6 21.3-21.3 21.3H405.3zm10.7-96c0 53-43 96-96 96s-96-43-96-96 43-96 96-96 96 43 96 96zM128 485.3c0-73.6 59.7-133.3 133.3-133.3h117.4c73.6 0 133.3 59.7 133.3 133.3 0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" />
          </svg>,
    title: 'Пользователи',
    description: '200',
    time: "Updated now"
  },
  {
    icon: <svg
            viewBox="0 0 640 512"
            fill="currentColor"
            height="4em"
            width="4em"
          >
            <path d="M144 160c-44.2 0-80-35.8-80-80S99.8 0 144 0s80 35.8 80 80-35.8 80-80 80zm368 0c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7-1.3 7.2-1.9 14.7-1.9 22.3 0 38.2 16.8 72.5 43.3 96H21.3C9.6 320 0 310.4 0 298.7zM405.3 320h-.7c26.6-23.5 43.3-57.8 43.3-96 0-7.6-.7-15-1.9-22.3 13.6-6.3 28.7-9.7 44.6-9.7h42.7c58.9 0 106.7 47.8 106.7 106.7 0 11.8-9.6 21.3-21.3 21.3H405.3zm10.7-96c0 53-43 96-96 96s-96-43-96-96 43-96 96-96 96 43 96 96zM128 485.3c0-73.6 59.7-133.3 133.3-133.3h117.4c73.6 0 133.3 59.7 133.3 133.3 0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" />
          </svg>,
    title: 'Пользователи 2',
    description: '200',
    time: "Updated now"
  },
  {
    icon: <svg
            viewBox="0 0 640 512"
            fill="currentColor"
            height="4em"
            width="4em"
          >
            <path d="M144 160c-44.2 0-80-35.8-80-80S99.8 0 144 0s80 35.8 80 80-35.8 80-80 80zm368 0c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7-1.3 7.2-1.9 14.7-1.9 22.3 0 38.2 16.8 72.5 43.3 96H21.3C9.6 320 0 310.4 0 298.7zM405.3 320h-.7c26.6-23.5 43.3-57.8 43.3-96 0-7.6-.7-15-1.9-22.3 13.6-6.3 28.7-9.7 44.6-9.7h42.7c58.9 0 106.7 47.8 106.7 106.7 0 11.8-9.6 21.3-21.3 21.3H405.3zm10.7-96c0 53-43 96-96 96s-96-43-96-96 43-96 96-96 96 43 96 96zM128 485.3c0-73.6 59.7-133.3 133.3-133.3h117.4c73.6 0 133.3 59.7 133.3 133.3 0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" />
          </svg>,
    title: 'Пользователи 3',
    description: '200',
    time: "Updated now"
  },
];

const BottomCards = () => {

  return (
    <div className='sm:h-[26vh] bg-green-200 flex items-center flex-col sm:flex-row gap-6 sm:gap-12 px-6 py-6'>
      {cards.map((card, i) => (
        <Fragment key={card.title}>
          <Card
            icon={card.icon}
            title={card.title}
            description={card.description}
            time={card.time}
          />
        </Fragment>
      ))}
    </div>
  )
}

export default BottomCards

const Card = ({ icon, title, description, time }) => {
  return (
    <div className={css.top_card}>
      <div className={css.top_card_block}>
        {icon}
        <div className={css.top_card_block_right}>
          <p className={css.top_card_block_right_title}>{title}</p>
          <p className={css.top_card_block_right_description}>{description}</p>
        </div>
      </div>
      <div className={css.top_card_bottom_block}>
        <p className={css.top_card_bottom_block_title}>{time}</p>
      </div>
    </div>
  )
}
