type AvailableRoutes =
  | "/"
  | "/auth"
  | "/profile"
  | "/orders"
  | "/routes"
  | "/routes/:id"
export type RouteNames =
  | "ROOT_PATH"
  | "AUTH_PATH"
  | "PROFILE_PATH"
  | "ORDERS_PATH"
  | "ROUTES_PATH"
  | "ROUTE_DETAIL_PATH"

export type PrivateRoutes = Record<RouteNames, AvailableRoutes>
export type PublicRoutes = Pick<PrivateRoutes, "AUTH_PATH">

export type RouteElement = {
  path: AvailableRoutes
  element: React.ReactElement
}
