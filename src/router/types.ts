type AvailableRoutes = "/" | "/auth"
export type RouteNames = "ROOT_PATH" | "AUTH_PATH"

export type PrivateRoutes = Record<RouteNames, AvailableRoutes>
export type PublicRoutes = Pick<PrivateRoutes, "AUTH_PATH">

export type RouteElement = {
  path: AvailableRoutes
  element: React.ReactElement
}
