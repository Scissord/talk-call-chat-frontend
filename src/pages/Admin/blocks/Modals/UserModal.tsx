import axios from '@axios';
import { FC, useEffect, useState } from 'react'
import { useViewContext } from '@context';
import { useAppSelector } from '@hooks';
import { RootState } from '@store/index';
import { getUser } from '@store/reducers/authSlice';
import { IUser } from '@interfaces';
import { selectTheme } from '@store/reducers/themeSlice';
import UserInfo from './UserModal/UserInfo';

type UserModalProps = {
  type: number,
  user: IUser | null,
  fetchUsers: () => void;
};

const css = {
  label: `
    text-lg font-semibold
  `,
  input: `
    px-2 py-1 min-w-[50vh]
    outline-none hover:bg-blue-100 border
    border-slate-300 rounded-md
  `,
  button: `
    border border-slate-300 rounded-lg
    p-2 hover:bg-blue-100
  `
};

const UserModal: FC<UserModalProps> = ({ type, user, fetchUsers }) => {
  const disabled = type === 0 || type === 3;

  const theme = useAppSelector(selectTheme);
  const auth = useAppSelector((state: RootState) => getUser(state));
  const context = useViewContext();

  const [user_info, setUserInfo] = useState(user);
  const [roles, setRoles] = useState([
    { role: "1", label: "Менеджер отдела продал call-center" },
    { role: "2", label: "Руководитель отдела продаж call-center" },
    { role: "3", label: "Оператор ПД" },
    { role: "4", label: "Оператор КД" },
    { role: "5", label: "РГ ПД" },
    { role: "6", label: "РГ КД" },
    { role: "7", label: "Администратор" },
  ]);

  const [creatingUser, setCreatingUser] = useState({
    id: null,
    name: "",
    password: "",
    role: roles[0].role,
  });

  useEffect(() => {
    let filteredRoles = roles;

    if (auth && +auth.role.id === 2) {
      filteredRoles = roles.filter((r) => +r.role === 1);
    }
    if (auth && +auth.role.id === 5) {
      filteredRoles = roles.filter((r) => +r.role === 3);
    }
    if (auth && +auth.role.id === 6) {
      filteredRoles = roles.filter((r) => +r.role === 4);
    }

    setRoles(filteredRoles);

    if (filteredRoles.length > 0) {
      setCreatingUser((prev) => ({
        ...prev,
        role: filteredRoles[0].role,
      }));
    }
  }, [auth]);

  const handleCreateUser = async () => {
    if (creatingUser?.name.length < 3 || creatingUser?.password.length < 5 || creatingUser?.role === null) {
      context?.notification.show("Логин больше 3, пароль больше 4 символов!", "error");
      return;
    }

    await axios({
      method: 'POST',
      url: `/users`,
      data: {
        name: creatingUser?.name,
        password: creatingUser?.password,
        role: creatingUser?.role
      }
    })
      .then(() => {
        context?.notification.show("Пользователь успешно создан!", "success");
        fetchUsers();
        context?.modal.hide();
      })
      .catch((err) => context?.notification.show(err.response.data.detail, "error"))
  };

  const handleUpdateUser = async () => {
    if (!user_info?.id || user_info?.name.length < 3 || user_info?.password.length < 5 || user_info?.role === null || user_info?.role === undefined) {
      context?.notification.show("Заполните все поля / Минимум: пароль - 5 символов, логин - 3", "error");
      return;
    }

    await axios({
      method: 'PATCH',
      url: `/users/${user_info?.id}`,
      data: {
        name: user_info?.name,
        // password: user_info?.password,
        role: user_info?.role
      }
    })
      .then(() => {
        context?.notification.show("Пользователь успешно обновлен!", "success");
        fetchUsers();
        context?.modal.hide();
      })
      .catch((err) => context?.notification.show(err.response.data.detail, "error"))
  };

  const handleDeleteUser = async () => {
    const confirm = window.confirm('Вы уверены?')
    if(!confirm) return;

    await axios({
      method: 'DELETE',
      url: `/users/${user_info?.id}`,
    })
      .then(() => {
        context?.notification.show("Пользователь успешно удален!", "success");
        fetchUsers();
        context?.modal.hide();
      })
      .catch((err) => context?.notification.show(err.response.data.detail, "error"))
  };

  return (
    <div>
      {(type === 0 || type === 2 || type === 3) && (
        <div className='flex flex-col gap-3'>
          <UserInfo
            roles={roles}
            handleUpdateUser={handleUpdateUser}
            handleDeleteUser={handleDeleteUser}
            isDisabled={disabled}
            user_info={user_info}
            setUserInfo={setUserInfo}
            type={type}
          />
        </div>
      )}
      {type === 1 && (
        <div className="flex flex-col gap-3 mt-4">
          <div className="flex flex-col gap-1">
            <label
              className={`${css.label} ${theme === 'dark' ? 'text-white' : 'text-black'}`}
            >
              Логин:
            </label>
            <input
              type="text"
              className={`${css.input} ${theme === 'dark' ? 'text-white' : 'text-black'}`}
              placeholder="Введите логин..."
              value={creatingUser?.name || ""}
              onChange={(e) => setCreatingUser({ ...creatingUser, name: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              className={`${css.label} ${theme === 'dark' ? 'text-white' : 'text-black'}`}
            >              Пароль:
            </label>
            <input
              type="password"
              className={`${css.input} ${theme === 'dark' ? 'text-white' : 'text-black'}`}
              value={creatingUser?.password || ""}
              placeholder="Введите пароль..."
              onChange={(e) => setCreatingUser({ ...creatingUser, password: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              className={`${css.label} ${theme === 'dark' ? 'text-white' : 'text-black'}`}
            >              Роль:
            </label>
            <select
              className={`${css.input} ${theme === 'dark' ? 'text-white' : 'text-black'}`}
              onChange={(e) => setCreatingUser({ ...creatingUser, role: e.target.value })}
            >
              {roles.map((option) => (
                <option
                  key={option.role}
                  value={option.role}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => handleCreateUser()}
            className={`${css.button} ${theme === 'dark' ? 'text-white' : 'text-black'}`}
          >
            Cоздать
          </button>
        </div>
      )}
    </div>
  )
}



export default UserModal;
