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
    login: "",
    password: "",
    manager_type: 1,
  })

  const [user_info, setUserInfo] = useState(user);

  const handleCreateUser = async () => {
    if (creatingUser?.login.length < 3 || creatingUser?.password.length < 6 || !creatingUser?.manager_type) {
      context.notification.show("Логин больше 3, пароль больше 6 символов!", "error");
      return;
    }

    await axios({
      method: 'POST',
      url: `v1/create_manager`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.user.token}`
      },
      data: {
        login: creatingUser?.login,
        password: creatingUser?.password,
        manager_type: creatingUser?.manager_type
      }
    })
      .then((res) => {
        context.notification.show("Пользователь успешно создан!", "success");
        context.modal.hide();
      })
      .catch((err) => context.notification.show(err.response.data.detail, "error"))
  };

  const handleUpdateUser = async () => {
    if (!user_info?.manager_id || user_info?.login.length < 3 || user_info?.password.length < 6 || user_info?.manager_type === null || user_info?.manager_type === undefined) {
      context.notification.show("Заполните все поля / Минимум: пароль - 6 символов, логин - 3", "error");
      return;
    }

    await axios({
      method: 'PATCH',
      url: `v1/update_manager`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.user.token}`
      },
      data: {
        manager_id: user_info.manager_id,
        manager_type: user_info.manager_type,
        login: user_info.login,
        password: user_info.password
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
      url: `v1/delete_manager?manager_id=${user_info.manager_id}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.user.token}`
      },
    })
      .then(() => {
        context.notification.show("Пользователь успешно создан!", "success");
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
              value={creatingUser?.login || ""}
              onChange={(e) => setCreatingUser({ ...creatingUser, login: e.target.value })}
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
            <label className={style.label}>КД/ПД:</label>
            <input
              type="number"
              className={style.input}
              placeholder="Введите КД/ПД..."
              value={creatingUser?.manager_type || ""}
              onChange={(e) => setCreatingUser({ ...creatingUser, manager_type: e.target.value })}
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
        value={user_info?.manager_id}
        onChange={(e) => setUserInfo({ ...user_info, manager_id: e.target.value })}
        disabled={true}
      />
      <p className='text-[24px] font-bold'>LOGIN:</p>
      <input
        type="text"
        className={style.input}
        value={user_info?.login}
        onChange={(e) => setUserInfo({ ...user_info, login: e.target.value })}
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
      <p className='text-[24px] font-bold'>MANAGER_TYPE:</p>
      <input
        type="text"
        className={style.input}
        value={user_info?.manager_type}
        onChange={(e) => setUserInfo({ ...user_info, manager_type: e.target.value })}
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