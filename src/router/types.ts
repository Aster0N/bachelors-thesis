type AvailableRoutes =
  | "/"
  | "/auth"
  | "/profile"
  | "/orders"
  | "/routes"
  | "/routes/:id"
  | "/history"
  | "/reports"
  | "/forbidden"
export type RouteNames =
  | "ROOT_PATH"
  | "AUTH_PATH"
  | "PROFILE_PATH"
  | "ORDERS_PATH"
  | "ROUTES_PATH"
  | "ROUTE_DETAIL_PATH"
  | "ROUTES_HISTORY_PATH"
  | "ROUTES_REPORTS_PATH"
  | "FORBIDDEN"

export type PrivateRoutes = Record<RouteNames, AvailableRoutes>
export type PublicRoutes = Pick<PrivateRoutes, "AUTH_PATH" | "FORBIDDEN">

export type RouteElement = {
  path: AvailableRoutes
  element: React.ReactElement
}
