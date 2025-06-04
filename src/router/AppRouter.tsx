import { useUserStore } from "@/modules/Auth/store/userStore"
import { privateRoutes, publicRoutes } from "@/router/index.ts"
import { useEffect, useState } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./routes"

const AppRouter = () => {
  const { accessToken } = useUserStore()
  const [isAuth, setIsAuth] = useState<boolean | null>(null)

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token")
    if (accessToken) {
      setIsAuth(true)
    } else {
      setIsAuth(false)
    }
  }, [accessToken])

  if (isAuth === null) {
    return <div>Загрузка...</div>
  }

  return (
    <Routes>
      {!isAuth &&
        publicRoutes?.map(route => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}

      {isAuth &&
        privateRoutes?.map(route => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}

      <Route
        path="*"
        element={
          <Navigate
            to={isAuth ? PRIVATE_ROUTES.ROOT_PATH : PUBLIC_ROUTES.AUTH_PATH}
          />
        }
      />
    </Routes>
  )
}

export default AppRouter
