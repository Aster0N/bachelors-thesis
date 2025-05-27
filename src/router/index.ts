import AuthPage from "@/pages/AuthPage/AuthPage.tsx"
import React from "react"
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./routes.ts"

import HomePage from "@/pages/HomePage/HomePage.tsx"
import type { RouteElement } from "./types.ts"

export const publicRoutes: RouteElement[] = [
  { path: PUBLIC_ROUTES.AUTH_PATH, element: React.createElement(AuthPage) },
]

export const privateRoutes: RouteElement[] = [
  { path: PUBLIC_ROUTES.AUTH_PATH, element: React.createElement(AuthPage) },
  { path: PRIVATE_ROUTES.ROOT_PATH, element: React.createElement(HomePage) },
]
