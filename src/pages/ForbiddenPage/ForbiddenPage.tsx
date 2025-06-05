import Button from "@/components/Button/Button"
import { useNavigate } from "react-router-dom"
import classes from "./ForbiddenPage.module.scss"

const ForbiddenPage = () => {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate("/")
  }

  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>Доступ запрещён</h1>
      <p className={classes.text}>
        У вас недостаточно прав для просмотра этой страницы.
      </p>
      <Button onClick={handleGoHome}>На главную</Button>
    </div>
  )
}

export default ForbiddenPage
