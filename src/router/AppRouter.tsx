import { AuthService } from "@/modules/Auth/AuthService"
import { useUserStore } from "@/modules/Auth/store/userStore"
import { adminRoutes, privateRoutes, publicRoutes } from "@/router/index.ts"
import { useEffect, useState } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { PUBLIC_ROUTES } from "./routes"

const AppRouter = () => {
  const { accessToken, setAuth, clearAuth, user } = useUserStore()
  const [isAuth, setIsAuth] = useState<boolean | null>(false)
  const [isPending, setIsPending] = useState(true)

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

  if (isAuth && user?.email == "Admin@1.com") {
    return (
      <Routes>
        {adminRoutes?.map(route => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        <Route path="*" element={<Navigate to={PUBLIC_ROUTES.FORBIDDEN} />} />
      </Routes>
    )
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

      <Route path="*" element={<Navigate to={PUBLIC_ROUTES.FORBIDDEN} />} />
    </Routes>
  )
}

export default AppRouter
