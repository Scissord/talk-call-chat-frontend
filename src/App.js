// components
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { NotFound } from "./views/error/404"
import { AuthProvider, PrivateRoute } from "contexts/auth"
import { SocketContextProvider } from "contexts/socket"
import { View } from "contexts/view"

const routes = [...require("./routes/app").default]

export default function App(props) {
  return (
    <AuthProvider>
      <BrowserRouter>
        <SocketContextProvider>
          <Routes>
            {routes.map((route) => {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    route.layout === "app" ? (
                      <PrivateRoute permission={route.permission}>
                        <View
                          display={route.view}
                          layout={route.layout}
                          title={route.title}
                        />
                      </PrivateRoute>
                    ) : (
                      <View
                        display={route.view}
                        layout={route.layout}
                        title={route.title}
                      />
                    )
                  }
                />
              )
            })}

            {/* 404 */}
            <Route
              path="*"
              element={
                <View
                  display={NotFound}
                  layout="home"
                  title={"404 Страница не найдена"}
                />
              }
            />
          </Routes>
        </SocketContextProvider>
      </BrowserRouter>
    </AuthProvider>
  )
}
