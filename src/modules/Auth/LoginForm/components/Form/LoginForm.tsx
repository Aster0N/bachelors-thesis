import Button from "@/components/Button/Button"
import Input from "@/components/Input/Input"
import { AuthService } from "@/modules/Auth/AuthService"
import { useUserStore } from "@/modules/Auth/store/userStore"
import { PRIVATE_ROUTES } from "@/router/routes"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { initialState, loginFormConfig } from "../../constants/formConfig"
import { validateLoginForm } from "../../helpers/formValidation"
import type { LoginFormData } from "../../types/types"
import classes from "./LoginForm.module.scss"

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState<LoginFormData>(initialState)
  const { setToken } = useUserStore()
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setUserFormData(prev => ({
      ...prev,
      [name]: {
        ...prev[name as keyof LoginFormData],
        value,
        error: "",
        isDirty: true,
      },
    }))

    const { isSuccess, errors } = validateLoginForm({
      ...userFormData,
      [name]: {
        ...userFormData[name as keyof LoginFormData],
        value,
        error: "",
        isDirty: true,
      },
    })

    if (!isSuccess) {
      setUserFormData(prev => ({
        ...prev,
        email: {
          ...prev.email,
          error: errors.email[0],
        },
        password: {
          ...prev.password,
          error: errors.password[0],
        },
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const { access_token } = await AuthService.login(
        userFormData.email.value,
        userFormData.password.value
      )
      localStorage.setItem("access_token", access_token)
      setToken(access_token)
      navigate(PRIVATE_ROUTES.ROOT_PATH)
    } catch (err: any) {
      console.error(
        "Ошибка авторизации:",
        err.response?.data?.detail || err.message
      )
    }
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      {Object.entries(loginFormConfig).map(([key, config]) => (
        <div key={key}>
          <Input
            label={config.label}
            type={config.type}
            name={config.name}
            onChange={handleChange}
            className={
              userFormData[key as keyof LoginFormData].error
                ? classes.inputError
                : ""
            }
          />
          <span
            className={[classes.validationError, "_caption-bold"].join(" ")}
          >
            {userFormData[key as keyof LoginFormData].error}
          </span>
        </div>
      ))}
      <Button>войти</Button>
    </form>
  )
}

export { LoginForm }
