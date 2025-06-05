import type { PrivateRoutes, PublicRoutes } from "./types"

export const PUBLIC_ROUTES: PublicRoutes = {
  AUTH_PATH: "/auth",
  FORBIDDEN: "/forbidden",
}
export const PRIVATE_ROUTES: PrivateRoutes = {
  ROOT_PATH: "/",
  AUTH_PATH: "/auth",
  PROFILE_PATH: "/profile",
  ORDERS_PATH: "/orders",
  ROUTES_PATH: "/routes",
  ROUTE_DETAIL_PATH: "/routes/:id",
  ROUTES_HISTORY_PATH: "/history",
  ROUTES_REPORTS_PATH: "/reports",
  FORBIDDEN: "/forbidden",
}
