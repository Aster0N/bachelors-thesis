import { AuthService } from "@/modules/Auth/api/AuthService"
import { useUserStore } from "@/modules/Auth/store/userStore"
import { privateRoutes, publicRoutes } from "@/router/index.ts"
import { useEffect, useState } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

const AppRouter = () => {
  const { setAuth } = useUserStore()
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token")
    if (accessToken) {
      AuthService.fetchCurrentUser()
        .then(user => {
          setAuth(user, accessToken)
          setIsAuth(true)
        })
        .catch(() => {
          localStorage.removeItem("access_token")
          setIsAuth(false)
        })
    }
  }, [setAuth])

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
      <Route path="*" element={<Navigate to="/auth" />} />
    </Routes>
  )
}

export default AppRouter
