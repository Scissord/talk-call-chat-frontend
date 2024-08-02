import axios from "axios"
import { AuthContext } from "contexts/auth"
import { ViewContext } from "contexts/view"
import React, { useContext, useState } from "react"
const style = {
  label: "text-black text-lg font-semibold",
  input:
    "text-gray-700 px-2 py-1 rounded-sm min-w-[50vh] outline-none hover:bg-blue-100 ",
}

export default function Signin() {
  const auth = useContext(AuthContext)
  const context = useContext(ViewContext)

  const [user, setUser] = useState({
    login: "",
    password: "",
  })

  const handleSignIn = async () => {
    if(user.login.length < 4) {
      context.notification.show('Длина логина должна быть >= 4 символов', "error");
      return;
    }

    if(user.password.length < 4) {
      context.notification.show('Длина пароля должна быть >= 4 символов', "error");
      return;
    }
    
    await axios({
      method: "POST",
      url: "/v1/login",
      data: user,
    })
      .then((res) => {
        const { manager, access_token } = res.data
        context.notification.show("Успешно!", "success")
        auth.auth.signin({ user: manager, token: access_token })
      })
      .catch((err) => {
        context.notification.show(err.response.data.detail, "error")
      })
  }

  return (
    <div className="flex flex-col items-center justify-center mt-[20vh]">
      <div className="flex bg-neutral-800 min-w-[50vh] items-center justify-center p-4 rounded-md">
        <img
          src="/logo.png"
          alt="logo"
          loading="lazy"
          className="w-36 object-cover pt-4 transition-opacity duration-200 ease-in-out"
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <div className="flex flex-col gap-1">
          <label className={style.label}>Логин:</label>
          <input
            type="text"
            className={style.input}
            placeholder="Введите логин..."
            value={user?.login || ""}
            onChange={(e) => setUser({ ...user, login: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className={style.label}>Пароль:</label>

          <input
            type="password"
            className={style.input}
            value={user?.password || ""}
            placeholder="Введите пароль..."
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <button
          onClick={handleSignIn}
          className="min-w-[50vh] mt-4 bg-white p-2 rounded-sm hover:bg-blue-100"
        >
          Войти
        </button>
      </div>
    </div>
  )
}
