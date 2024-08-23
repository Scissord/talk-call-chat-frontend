import axios from "axios"
import { createContext, useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import Settings from "../utils/settings.json"

// auth context
export const AuthContext = createContext()

export function AuthProvider(props) {
  // axios base URL
  axios.defaults.baseURL = Settings[process.env.NODE_ENV].server_url

  const cache = JSON.parse(localStorage.getItem("user"))
  const [user, setUser] = useState(cache)

  useEffect(() => {
    // update the auth status
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"))
      localStorage.setItem("user", JSON.stringify(user))
      setUser(user)
    };
    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token"));
      localStorage.setItem("token", JSON.stringify(token));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    };
  }, []);

  const signin = async (user, token) => {
    if (user && token) {
      const userData = { ...user }
      localStorage.setItem("user", JSON.stringify(userData))
      localStorage.setItem("token", JSON.stringify(token))
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      setUser(userData)
      return (window.location = "/")
    }
  };

  const signout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    delete axios.defaults.headers.common["Authorization"]
    setUser(null)
    return (window.location = "/signin")
  };

  const data = {
    auth: {
      signin,
      signout,
    },
    user,
  };

  return <AuthContext.Provider value={data} {...props} />
}

export function PrivateRoute(props) {
  // check user exists
  const user = JSON.parse(localStorage.getItem("user"))

  if (!user) return <Navigate to="/signin" />

  return props.children
}
