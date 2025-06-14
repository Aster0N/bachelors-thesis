import Button from "@/components/Button/Button"
import Input from "@/components/Input/Input"
import { AuthService } from "@/modules/Auth/AuthService"
import {
  initialState,
  registrationFormConfig,
} from "@/modules/Auth/RegistrationForm/constants/formConfig"
import { validateRegistrationForm } from "@/modules/Auth/RegistrationForm/helpers/registrationFormValidation"
import type { RegistrationFormData } from "@/modules/Auth/RegistrationForm/types/types"
import { useUserStore } from "@/modules/Auth/store/userStore"
import { PRIVATE_ROUTES } from "@/router/routes"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import classes from "./RegistrationForm.module.scss"

const RegistrationForm = () => {
  const [userFormData, setUserFormData] =
    useState<RegistrationFormData>(initialState)
  const { setToken } = useUserStore()
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setUserFormData(prev => ({
      ...prev,
      [name]: {
        ...prev[name as keyof RegistrationFormData],
        value,
        error: "",
        isDirty: true,
      },
    }))

    const { isSuccess, errors } = validateRegistrationForm({
      ...userFormData,
      [name]: {
        ...userFormData[name as keyof RegistrationFormData],
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
        username: {
          ...prev.username,
          error: errors.username[0],
        },
        password: {
          ...prev.password,
          error: errors.password[0],
        },
        passwordConfirm: {
          ...prev.passwordConfirm,
          error: errors.passwordConfirm[0],
        },
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await AuthService.register(
        userFormData.email.value,
        userFormData.password.value,
        userFormData.username.value
      )

      const { access_token } = await AuthService.login(
        userFormData.email.value,
        userFormData.password.value
      )
      localStorage.setItem("access_token", access_token)
      setToken(access_token)
      navigate(PRIVATE_ROUTES.ROOT_PATH)
    } catch (err: any) {
      console.error(
        "Ошибка регистрации:",
        err.response?.data?.detail || err.message
      )
    }
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      {Object.entries(registrationFormConfig).map(([key, config]) => (
        <div key={key}>
          <Input
            label={config.label}
            type={config.type}
            name={config.name}
            onChange={handleChange}
            className={
              userFormData[key as keyof RegistrationFormData].error
                ? classes.inputError
                : ""
            }
          />
          <span
            className={[classes.validationError, "_caption-bold"].join(" ")}
          >
            {userFormData[key as keyof RegistrationFormData].error}
          </span>
        </div>
      ))}
      <Button>создать аккаунт</Button>
    </form>
  )
}

export { RegistrationForm }
