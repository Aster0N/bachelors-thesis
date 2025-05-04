import "@/styles/fonts.scss"
import "@/styles/index.scss"
import "@/styles/variables.scss"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
