import type { PrivateRoutes, PublicRoutes } from "./types"

export const PUBLIC_ROUTES: PublicRoutes = {
  AUTH_PATH: "/auth",
}
export const PRIVATE_ROUTES: PrivateRoutes = {
  ROOT_PATH: "/",
  AUTH_PATH: "/auth",
  PROFILE_PATH: "/profile",
  ORDERS_PATH: "/orders",
  ROUTES_PATH: "/routes",
  ROUTE_DETAIL_PATH: "/routes/:id",
}
