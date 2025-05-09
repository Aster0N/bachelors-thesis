import { z } from "zod"
import { LoginFormData } from "../types/types"

export const initialState: LoginFormData = {
  email: {
    value: "",
    error: "",
    isDirty: false,
  },
  password: {
    value: "",
    error: "",
    isDirty: false,
  },
}

export const loginFormConfig = {
  email: {
    value: initialState.email,
    label: "email",
    type: "email",
    name: "email",
  },
  password: {
    value: initialState.password,
    label: "пароль",
    type: "password",
    name: "password",
  },
}

export const loginSchema = z
  .object({
    email: z.string().email("Введите корректный email"),
    password: z
      .string()
      .min(8, "Пароль должен содержать минимум 8 символов")
      .max(50, "Пароль не может быть длиннее 50 символов")
      .regex(
        /[A-Z]/,
        "Пароль должен содержать минимум одну заглавную букву (A–Z)"
      )
      .regex(/[0-9]/, "Пароль должен содержать минимум одну цифру (0–9)")
      .regex(
        /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/,
        "Пароль должен содержать минимум один специальный символ (!@#$%^&*()_+-=[]{}|;:,.<>?)"
      ),
  })
  .required()
