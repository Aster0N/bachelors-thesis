import Footer from "@/modules/Footer/Footer"
import Header from "@/modules/Header/Header"
import AppRouter from "@/router/AppRouter.tsx"
import { BrowserRouter } from "react-router-dom"

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <AppRouter />
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
