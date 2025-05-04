import Home from "@/pages/Home.tsx"
import React from "react"
import { ROUTES } from "./routes.ts"

import type { RouteElement } from "./types.ts"

export const unauthRoutes: RouteElement[] = [
  { path: ROUTES.ROOT_PATH, element: React.createElement(Home) },
]
