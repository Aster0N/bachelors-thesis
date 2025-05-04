import Footer from "@/components/Footer/Footer"
import Header from "@/components/Header/Header"
import AppRouter from "@/router/AppRouter.tsx"
import { BrowserRouter } from "react-router-dom"

const App = () => {
  return (
    <BrowserRouter>
      <div className="_layout_wrapper">
      	<Header />
	      <main>
	        <div className="_wrapper">
	          <AppRouter />
	        </div>
	      </main>
	      <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
