import LinkedButton from "@/components/LinkedButton/LinkedButton"
import { LoginForm } from "@/modules/Auth/LoginForm/index.ts"
import { RegistrationForm } from "@/modules/Auth/RegistrationForm/components/RegistrationForm"
import { useState } from "react"
import classes from "./AuthPage.module.scss"

const AuthPage = () => {
  const [showLoginForm, setShowLoginForm] = useState(true)

  return (
    <>
      <h1>SkyCaptureManager</h1>

      <div className="_huge">
        управление заявками <br />
        &emsp;настройка маршрутов <br />
        настройка параметров видеосъёмки <br />
        &emsp;&emsp;генерация отчетов <br />
        просмотр истории и статистики
      </div>

      <div className={classes.authFormWrapper}>
        <h3 className={classes.authFormName}>
          {showLoginForm ? "Войти в систему" : "Зарегистрироваться"}
        </h3>
        {showLoginForm && <LoginForm />}
        {!showLoginForm && <RegistrationForm />}
        <div
          className={[classes.changeFormLable, "_small"].join(" ")}
          onClick={() => setShowLoginForm(!showLoginForm)}
        >
          <LinkedButton className={classes.changeFormButton}>
            {showLoginForm
              ? "зарегистрировать новый аккаунт"
              : "войти с имеющимся аккаунтом"}
          </LinkedButton>
        </div>
      </div>
    </>
  )
}

export default AuthPage
