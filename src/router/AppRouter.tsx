import { publicRoutes } from "@/router/index.ts"
import { Navigate, Route, Routes } from "react-router-dom"

const AppRouter = () => (
  <Routes>
    {publicRoutes?.map(route => (
      <Route key={route.path} path={route.path} element={route.element} />
    ))}
    <Route path="*" element={<Navigate to="/auth" />} />
  </Routes>
)

export default AppRouter
