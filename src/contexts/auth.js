import axios from "axios"
import { createContext, useEffect, useState } from "react"
import Settings from "../data/settings.json"
import { Navigate } from "react-router-dom"

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
      let user = JSON.parse(localStorage.getItem("user"))
      localStorage.setItem("user", JSON.stringify(user))
      setUser(user)
    }
  }, [])

  const signin = async ({ token, user }) => {
    if (user && token) {
      const userData = { ...user, token }
      localStorage.setItem("user", JSON.stringify(userData))
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      setUser(userData)
      return (window.location = "/")
    }
  }

  const signout = () => {
    localStorage.removeItem("user")
    delete axios.defaults.headers.common["Authorization"]
    setUser(null)
    return (window.location = "/signin")
  }

  const data = {
    auth: {
      signin,
      signout,
    },
    user,
  }

  return <AuthContext.Provider value={data} {...props} />
}

export function PrivateRoute(props) {
  // check user exists
  const user = JSON.parse(localStorage.getItem("user"))

  if (!user) return <Navigate to="/signin" />

  return props.children
}
