import { FC } from 'react';
import { IUser } from '@interfaces';
import Card from './Cards/Card';

type TopCardsProps = {
  users: IUser[]
  fetchUsers: () => void;
};

const cards = [
  {
    title: 'Добавить'
  },
  {
    title: 'Удалить'
  },
  // {
  //   title: 'Найти'
  // },
  // {
  //   title: 'Изменить'
  // },
];

const Cards: FC<TopCardsProps> = ({ users, fetchUsers }) => {
  return (
    <div className='h-full py-2 px-6 flex flex-col items-center justify-center gap-6'>
      {cards.map((card) => (
        <Card
          key={card.title}
          users={users}
          title={card.title}
          fetchUsers={fetchUsers}
        />
      ))}
    </div>
  )
}

export default Cards;
