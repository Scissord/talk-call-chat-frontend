import React, { Fragment, useContext, useState } from 'react';
import { SelectSearch } from 'components/lib'
import { ViewContext } from 'contexts/view';
import UserModal from './user_modal';

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
]

const TopCards = ({ users, fetchUsers }) => {
  return (
    <div className='min-h-[20vh] bg-blue-300 py-2 px-6 flex flex-col sm:flex-row items-center gap-6'>
      {cards.map((card, i) => (
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

const Card = ({ users, title, fetchUsers }) => {
  const context = useContext(ViewContext);

  const [user, setUser] = useState(null);

  const handleOpenModal = (type, user, modal_title) => {
    context.modal.show({
      title: modal_title,
      children: <UserModal type={type} user={user} />
    }, () => fetchUsers())
  }

  return (
    <div className='w-full sm:w-1/4 h-[15vh] bg-white border border-slate-300 rounded-lg px-4 py-2'>
      <p className='text-[24px] font-semibold mb-2'>{title}</p>
      {title === 'Найти' && (
        <SelectSearch
          className="w-full"
          selectClass={`text-sm w-full`}
          placeholder={"Выберите пользователя"}
          options={users}
          value={user}
          onChange={(id, user) => {
            setUser(id);
            handleOpenModal(0, user, "Информация о пользователе");
          }}
          hide
        />
      )}
      {title === 'Добавить' && (
        <button
          onClick={() => handleOpenModal(1, null, "Добавление пользователя")}
          className="border border-slate-300 rounded-lg bg-white p-2 hover:bg-blue-100"
        >
          Открыть
        </button>
      )}
      {title === 'Изменить' && (
        <SelectSearch
          className="w-full"
          selectClass={`text-sm w-full`}
          placeholder={"Выберите пользователя"}
          options={users}
          value={user}
          onChange={(id, user) => {
            setUser(id);
            handleOpenModal(2, user, "Информация о пользователе");
          }}
          hide
        />
      )}
      {title === 'Удалить' && (
        <SelectSearch
          className="w-full"
          selectClass={`text-sm w-full`}
          placeholder={"Выберите пользователя"}
          options={users}
          value={user}
          onChange={(id, user) => {
            setUser(id);
            handleOpenModal(3, user, "Удаление пользователя");
          }}
          hide
        />
      )}
    </div>  
  )
}
