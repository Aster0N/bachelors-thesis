import AuthPage from "@/pages/AuthPage/AuthPage.tsx"
import React from "react"
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./routes.ts"

import ForbiddenPage from "@/pages/ForbiddenPage/ForbiddenPage.tsx"
import HistoryPage from "@/pages/HistoryPage/HistoryPage.tsx"
import HomePage from "@/pages/HomePage/HomePage.tsx"
import OrdersPage from "@/pages/OrdersPage/OrdersPage.tsx"
import ProfilePage from "@/pages/ProfilePage/ProfilePage.tsx"
import ReportsPage from "@/pages/ReportsPage/ReportsPage.tsx"
import RouteDetailesPage from "@/pages/RouteDetailesPage/RouteDetailsPage.tsx"
import RoutesPage from "@/pages/RoutesPage/RoutesPage.tsx"
import type { RouteElement } from "./types.ts"

export const publicRoutes: RouteElement[] = [
  { path: PUBLIC_ROUTES.AUTH_PATH, element: React.createElement(AuthPage) },
  {
    path: PRIVATE_ROUTES.FORBIDDEN,
    element: React.createElement(ForbiddenPage),
  },
]

export const privateRoutes: RouteElement[] = [
  { path: PUBLIC_ROUTES.AUTH_PATH, element: React.createElement(AuthPage) },
  { path: PRIVATE_ROUTES.ROOT_PATH, element: React.createElement(HomePage) },
  {
    path: PRIVATE_ROUTES.PROFILE_PATH,
    element: React.createElement(ProfilePage),
  },
  {
    path: PRIVATE_ROUTES.ORDERS_PATH,
    element: React.createElement(OrdersPage),
  },
  {
    path: PRIVATE_ROUTES.ROUTES_PATH,
    element: React.createElement(RoutesPage),
  },
  {
    path: PRIVATE_ROUTES.ROUTE_DETAIL_PATH,
    element: React.createElement(RouteDetailesPage),
  },
  {
    path: PRIVATE_ROUTES.FORBIDDEN,
    element: React.createElement(ForbiddenPage),
  },
]

export const adminRoutes: RouteElement[] = [
  { path: PUBLIC_ROUTES.AUTH_PATH, element: React.createElement(AuthPage) },
  { path: PRIVATE_ROUTES.ROOT_PATH, element: React.createElement(HomePage) },
  {
    path: PRIVATE_ROUTES.PROFILE_PATH,
    element: React.createElement(ProfilePage),
  },
  {
    path: PRIVATE_ROUTES.ORDERS_PATH,
    element: React.createElement(OrdersPage),
  },
  {
    path: PRIVATE_ROUTES.ROUTES_PATH,
    element: React.createElement(RoutesPage),
  },
  {
    path: PRIVATE_ROUTES.ROUTE_DETAIL_PATH,
    element: React.createElement(RouteDetailesPage),
  },
  {
    path: PRIVATE_ROUTES.ROUTES_HISTORY_PATH,
    element: React.createElement(HistoryPage),
  },
  {
    path: PRIVATE_ROUTES.ROUTES_REPORTS_PATH,
    element: React.createElement(ReportsPage),
  },
  {
    path: PRIVATE_ROUTES.FORBIDDEN,
    element: React.createElement(ForbiddenPage),
  },
]
