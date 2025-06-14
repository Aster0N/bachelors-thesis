import { AuthService } from "@/modules/Auth/AuthService"
import { useUserStore } from "@/modules/Auth/store/userStore"
import { adminRoutes, privateRoutes, publicRoutes } from "@/router/index.ts"
import { useEffect, useState } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./routes"

const AppRouter = () => {
  const { accessToken, setAuth, clearAuth, user } = useUserStore()
  const [isAuth, setIsAuth] = useState<boolean | null>(false)
  const [isPending, setIsPending] = useState(true)
  const ADMIN_EMAIL = "Admin@1.com"

  const checkAuth = async () => {
    setIsPending(true)
    const accessToken = localStorage.getItem("access_token")
    if (accessToken) {
      const user = await AuthService.fetchCurrentUser()
      setIsAuth(true)
      setAuth(user, accessToken)
    } else {
      clearAuth()
      setIsAuth(false)
    }
    setIsPending(false)
  }

  useEffect(() => {
    checkAuth()
  }, [accessToken])

  if (isPending) {
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

      {isAuth &&
        user?.email == ADMIN_EMAIL &&
        adminRoutes?.map(route => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}

      {!isAuth && (
        <Route path="*" element={<Navigate to={PUBLIC_ROUTES.AUTH_PATH} />} />
      )}

      {isAuth && user?.email != ADMIN_EMAIL && (
        <>
          <Route
            path={PRIVATE_ROUTES.ROUTES_REPORTS_PATH}
            element={<Navigate to={PUBLIC_ROUTES.FORBIDDEN} />}
          />
          <Route
            path={PRIVATE_ROUTES.ROUTES_HISTORY_PATH}
            element={<Navigate to={PUBLIC_ROUTES.FORBIDDEN} />}
          />
          <Route
            path="*"
            element={<Navigate to={PRIVATE_ROUTES.ROOT_PATH} />}
          />
        </>
      )}

      {isAuth && user?.email == ADMIN_EMAIL && (
        <Route path="*" element={<Navigate to={PRIVATE_ROUTES.ROOT_PATH} />} />
      )}
    </Routes>
  )
}

export default AppRouter
