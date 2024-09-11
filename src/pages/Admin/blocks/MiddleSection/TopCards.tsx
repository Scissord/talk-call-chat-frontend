import { FC, Fragment } from 'react';
import { IUser } from '@interfaces';
import Card from './TopCards/Card';

type TopCardsProps = {
  users: IUser[]
  fetchUsers: () => void;
};

const cards = [
  {
    title: 'Найти'
  },
  {
    title: 'Добавить'
  },
  {
    title: 'Изменить'
  },
  {
    title: 'Удалить'
  },
];

const TopCards: FC<TopCardsProps> = ({ users, fetchUsers }) => {
  return (
    <div className='min-h-[20vh] bg-blue-300 py-2 px-6 flex flex-col sm:flex-row items-center gap-6'>
      {cards.map((card) => (
        <Fragment key={card.title}>
          <Card
            users={users}
            title={card.title}
            fetchUsers={fetchUsers}
          />
        </Fragment>
      ))}
    </div>
  )
}

export default TopCards
