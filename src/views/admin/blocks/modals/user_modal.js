import axios from 'axios';
import { AuthContext } from 'contexts/auth';
import { ViewContext } from 'contexts/view';
import { useContext, useEffect, useState } from 'react'

const style = {
  label: "text-black text-lg font-semibold",
  input:
    "text-gray-700 px-2 py-1 min-w-[50vh] outline-none hover:bg-blue-100 border border-slate-300 rounded-md",
}

const UserModal = ({ type, user }) => {
  const disabled = type === 0 || type === 3;

  const auth = useContext(AuthContext);
  const context = useContext(ViewContext);

  const [creatingUser, setCreatingUser] = useState({
    id: null,
    name: "",
    password: "",
    role: null
  })

  const [user_info, setUserInfo] = useState(user);

  const handleCreateUser = async () => {
    if (creatingUser?.name.length < 3 || creatingUser?.password.length < 5 || !creatingUser?.role) {
      context.notification.show("Логин больше 3, пароль больше 6 символов!", "error");
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
      .then((res) => {
        context.notification.show("Пользователь успешно создан!", "success");
        context.modal.hide();
      })
      .catch((err) => context.notification.show(err.response.data.detail, "error"))
  };

  const handleUpdateUser = async () => {
    if (!user_info?.id || user_info?.name.length < 3 || user_info?.password.length < 6 || user_info?.role === null || user_info?.role === undefined) {
      context.notification.show("Заполните все поля / Минимум: пароль - 6 символов, логин - 3", "error");
      return;
    }

    await axios({
      method: 'PATCH',
      url: `/users/${user_info?.id}`,
      data: {
        name: user_info?.name,
        password: user_info?.password,
        role: user_info?.role
      }
    })
      .then(() => {
        context.notification.show("Пользователь успешно обновлен!", "success");
        context.modal.hide();
      })
      .catch((err) => context.notification.show(err.response.data.detail, "error"))
  };

  const handleDeleteUser = async () => {
    const confirm = window.confirm('Вы уверены?')
    if(!confirm) return;

    await axios({
      method: 'DELETE',
      url: `/users/${user_info?.id}`,
    })
      .then(() => {
        context.notification.show("Пользователь успешно удален!", "success");
        context.modal.hide();
      })
      .catch((err) => context.notification.show(err.response.data.detail, "error"))
  };

  return (
    <div>
      {(type === 0 || type === 2 || type === 3) && (
        <div className='flex flex-col gap-3'>
          <UserInfo
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
            <label className={style.label}>Логин:</label>
            <input
              type="text"
              className={style.input}
              placeholder="Введите логин..."
              value={creatingUser?.name || ""}
              onChange={(e) => setCreatingUser({ ...creatingUser, name: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className={style.label}>Пароль:</label>
            <input
              type="password"
              className={style.input}
              value={creatingUser?.password || ""}
              placeholder="Введите пароль..."
              onChange={(e) => setCreatingUser({ ...creatingUser, password: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className={style.label}>Роль:</label>
            <input
              type="number"
              className={style.input}
              placeholder="Введите роль..."
              value={creatingUser?.role || ""}
              onChange={(e) => setCreatingUser({ ...creatingUser, role: e.target.value })}
            />
          </div>
          <button
            onClick={() => handleCreateUser()}
            className="border border-slate-300 rounded-lg bg-white p-2 hover:bg-blue-100"
          >
            Cоздать
          </button>
        </div>
      )}
    </div>
  )
}

const UserInfo = ({ handleUpdateUser, handleDeleteUser, isDisabled, user_info, setUserInfo, type }) => {
  return (
    <div className='flex flex-col gap-2'>
      <p className='text-[24px] font-bold'>#ID:</p>
      <input
        type="text"
        className={style.input}
        value={user_info?.id}
        onChange={(e) => setUserInfo({ ...user_info, id: e.target.value })}
        disabled={true}
      />
      <p className='text-[24px] font-bold'>Name:</p>
      <input
        type="text"
        className={style.input}
        value={user_info?.name}
        onChange={(e) => setUserInfo({ ...user_info, name: e.target.value })}
        disabled={isDisabled}
      />
      <p className='text-[24px] font-bold'>PASSWORD:</p>
      <input
        type="text"
        className={style.input}
        value={user_info?.password}
        onChange={(e) => setUserInfo({ ...user_info, password: e.target.value })}
        disabled={isDisabled}
      />
      <p className='text-[24px] font-bold'>Role:</p>
      <input
        type="text"
        className={style.input}
        value={user_info?.role}
        onChange={(e) => setUserInfo({ ...user_info, role: e.target.value })}
        disabled={isDisabled}
      />
      {type === 2 && (
        <button
          onClick={() => handleUpdateUser()}
          className="ml-auto border border-slate-300 rounded-lg bg-white p-2 hover:bg-blue-100 mt-3"
        >
          Сохранить
        </button>
      )}
      {type === 3 && (
        <button
          onClick={() => handleDeleteUser()}
          className="ml-auto border border-slate-300 rounded-lg bg-white p-2 hover:bg-blue-100 mt-3"
        >
          Сохранить
        </button>
      )}
    </div>
  )
};

export default UserModal