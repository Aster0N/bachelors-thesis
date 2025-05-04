import Home from "@/pages/Home.tsx"
import React from "react"
import { ROUTES } from "./routes.ts"

type Route = {
  path: string
  element: React.ReactElement
}

export const unauthRoutes: Route[] = [
  { path: ROUTES.MAIN_PATH, element: React.createElement(Home) },
]
