import { lazy } from "react"
import Signin from "views/auth/signin"
import { s } from "components/lib"

const MainPage = lazy(() => import("views/home"));
const AdminPage = lazy(() => import("views/admin"));

const Routes = [
  {
    path: "/",
    view: s(MainPage),
    layout: "app",
    title: "Главная",
  },
  {
    path: "/admin",
    view: s(AdminPage),
    layout: "app",
    title: "Админка",
  },
  {
    path: "/signin",
    view: Signin,
    layout: "auth",
    title: "Авторизация",
  },
]

export default Routes
