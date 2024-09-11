import { FC, useState } from "react";
import { SelectSearch } from '@ui';
import { useViewContext } from '@context';
import { IUser } from "@interfaces";
import UserModal from '../../Modals/UserModal';

type CardProps = {
  users: IUser[];
  title: string;
  fetchUsers: () => void;
};

const Card: FC<CardProps> = ({ users, title, fetchUsers }) => {
  const context = useViewContext();

  const [user, setUser] = useState<string | undefined>(undefined);

  const handleOpenModal = (type: number, user: IUser | null, modal_title: string) => {
    context?.modal.show({
      title: modal_title,
      children: <UserModal
        type={type}
        user={user}
        fetchUsers={fetchUsers}
      />
    });
  };

  return (
    <div className='w-full sm:w-1/4 h-[15vh] bg-white border border-slate-300 rounded-lg px-4 py-2'>
      <p className='text-[24px] font-semibold mb-2'>{title}</p>
      {title === 'Найти' && (
        <SelectSearch
          array={users ?? []}
          value={user}
          className="w-full"
          placeholder={"Выберите пользователя"}
          onChange={(id, user) => {
            setUser(id);
            handleOpenModal(0, user, "Информация о пользователе");
          }}
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
          array={users ?? []}
          className="w-full"
          placeholder={"Выберите пользователя"}
          value={user}
          onChange={(id, user) => {
            setUser(id);
            handleOpenModal(2, user, "Информация о пользователе");
          }}
        />
      )}
      {title === 'Удалить' && (
        <SelectSearch
          array={users ?? []}
          className="w-full"
          placeholder={"Выберите пользователя"}
          value={user}
          onChange={(id, user) => {
            setUser(id);
            handleOpenModal(3, user, "Удаление пользователя");
          }}
        />
      )}
    </div>
  );
};

export default Card;
