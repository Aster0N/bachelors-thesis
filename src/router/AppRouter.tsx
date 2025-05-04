import { unauthRoutes } from "@/router/index.ts"
import { Navigate, Route, Routes } from "react-router-dom"

const AppRouter = () => (
  <Routes>
    {unauthRoutes?.map(route => (
      <Route key={route.path} path={route.path} element={route.element} />
    ))}
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
)

export default AppRouter
