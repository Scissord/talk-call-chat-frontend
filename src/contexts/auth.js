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
    if (localStorage.getItem("accessToken") && localStorage.getItem("accessTokenEndTime")) {
      const accessToken = JSON.parse(localStorage.getItem("accessToken"));
      const accessTokenEndTime = JSON.parse(localStorage.getItem("accessTokenEndTime"));
      localStorage.setItem("accessToken", JSON.stringify(accessToken));
      localStorage.setItem("accessTokenEndTime", JSON.stringify(accessTokenEndTime))
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    };
    if (localStorage.getItem("refreshToken") && localStorage.getItem("refreshTokenEndTime")) {
      const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
      const refreshTokenEndTime = JSON.parse(localStorage.getItem("refreshTokenEndTime"));
      localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
      localStorage.setItem("refreshTokenEndTime", JSON.stringify(refreshTokenEndTime))
      axios.defaults.headers.common["X-Refresh-Token"] = `Bearer ${refreshToken}`;
    };
  }, []);

  const signin = async (user, accessToken, accessTokenEndTime, refreshToken, refreshTokenEndTime) => {
    if (user && accessToken && refreshToken && refreshTokenEndTime) {
      const userData = { ...user }
      localStorage.setItem("user", JSON.stringify(userData))
      localStorage.setItem("accessToken", JSON.stringify(accessToken))
      localStorage.setItem("accessTokenEndTime", JSON.stringify(accessTokenEndTime))
      localStorage.setItem("refreshToken", JSON.stringify(refreshToken))
      localStorage.setItem("refreshTokenEndTime", JSON.stringify(refreshTokenEndTime))
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
      axios.defaults.headers.common["X-Refresh-Token"] = `Bearer ${refreshToken}`;
      setUser(userData)
      return (window.location = "/")
    }
  };

  const signout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("accessToken")
    localStorage.removeItem("accessTokenEndTime")
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
