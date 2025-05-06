import AuthPage from "@/pages/AuthPage/AuthPage.tsx"
import React from "react"
import { PUBLIC_ROUTES } from "./routes.ts"

import type { RouteElement } from "./types.ts"

export const publicRoutes: RouteElement[] = [
  { path: PUBLIC_ROUTES.AUTH_PATH, element: React.createElement(AuthPage) },
]
