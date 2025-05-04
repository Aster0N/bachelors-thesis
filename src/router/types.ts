type AvailableRoutes = "/" | "/auth"
export type RouteNames = "ROOT_PATH" | "AUTH_PATH"
export type RouteNamesToPath = Record<RouteNames, AvailableRoutes>
export type RouteElement = {
  path: AvailableRoutes
  element: React.ReactElement
}
