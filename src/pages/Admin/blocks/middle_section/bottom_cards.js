import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from 'contexts/auth';
import { Fragment } from 'react';
import { ViewContext } from 'contexts/view';

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
  const auth = useContext(AuthContext);
  const context = useContext(ViewContext);

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
      {/* <UmnicoIntegrationsCard
        integrations={umnicoIntegrations}
      /> */}
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

const UmnicoIntegrationsCard = ({ integrations }) => {
  return (
    <div className={css.top_card}>
      <div className={"h-full flex items-center justify-between px-5 py-3"}>
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          height="4em"
          width="4em"
        >
          <path d="M19.864 8.465a3.505 3.505 0 00-3.03-4.449A3.005 3.005 0 0014 2a2.98 2.98 0 00-2 .78A2.98 2.98 0 0010 2c-1.301 0-2.41.831-2.825 2.015a3.505 3.505 0 00-3.039 4.45A4.028 4.028 0 002 12c0 1.075.428 2.086 1.172 2.832A4.067 4.067 0 003 16c0 1.957 1.412 3.59 3.306 3.934A3.515 3.515 0 009.5 22c.979 0 1.864-.407 2.5-1.059A3.484 3.484 0 0014.5 22a3.51 3.51 0 003.19-2.06 4.006 4.006 0 003.138-5.108A4.003 4.003 0 0022 12a4.028 4.028 0 00-2.136-3.535zM9.5 20c-.711 0-1.33-.504-1.47-1.198L7.818 18H7c-1.103 0-2-.897-2-2 0-.352.085-.682.253-.981l.456-.816-.784-.51A2.019 2.019 0 014 12c0-.977.723-1.824 1.682-1.972l1.693-.26-1.059-1.346a1.502 1.502 0 011.498-2.39L9 6.207V5a1 1 0 012 0v13.5c0 .827-.673 1.5-1.5 1.5zm9.575-6.308l-.784.51.456.816c.168.3.253.63.253.982 0 1.103-.897 2-2.05 2h-.818l-.162.802A1.502 1.502 0 0114.5 20c-.827 0-1.5-.673-1.5-1.5V5c0-.552.448-1 1-1s1 .448 1 1.05v1.207l1.186-.225a1.502 1.502 0 011.498 2.39l-1.059 1.347 1.693.26A2.002 2.002 0 0120 12c0 .683-.346 1.315-.925 1.692z" />
        </svg>
        <div className={"w-full h-full overflow-y-auto"}>
          <div className='grid grid-cols-2 gap-3 overflow-hidden'>
            <div className="w-full text-center">
              <p className="text-[16px] font-bold">{"ID"}</p>
            </div>
            <div className="w-full">
              <p className="text-[13px] font-semibold">{"LOGIN"}</p>
            </div>
          </div>
          {integrations.length > 0 && integrations.map((integration) =>(
            <div key={integration.id} className='grid grid-cols-2 gap-3 overflow-hidden'>
              <div className="w-full text-center">
                <p className="text-[16px] font-bold">{integration.id}</p>
              </div>
              <div className="w-full">
                <p className="text-[13px] font-semibold">{integration.login}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
