import { z } from "zod"
import { FormField, RegistrationFormData } from "../types/types"

const initialFieldValue: FormField = {
  value: "",
  error: "",
  isDirty: false,
}

export const initialState: RegistrationFormData = {
  email: initialFieldValue,
  username: initialFieldValue,
  password: initialFieldValue,
  passwordConfirm: initialFieldValue,
}

export const registrationFormConfig = {
  email: {
    value: initialState.email,
    label: "email",
    type: "email",
    name: "email",
  },
  username: {
    value: initialState.username,
    label: "имя пользователя",
    type: "text",
    name: "username",
  },
  password: {
    value: initialState.password,
    label: "пароль",
    type: "password",
    name: "password",
  },
  passwordConfirm: {
    value: initialState.passwordConfirm,
    label: "подтвердить пароль",
    type: "password",
    name: "passwordConfirm",
  },
}

export const registrationSchema = z
  .object({
    email: z.string().email("Введите корректный email"),
    username: z
      .string()
      .min(2, "Имя пользователя должно содержать минимум 2 символа"),
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
    passwordConfirm: z
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
  .superRefine(({ passwordConfirm, password }, ctx) => {
    if (passwordConfirm !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Пароли не совпадают",
        path: ["passwordConfirm"],
      })
    }
  })
// .refine(data => data.password === data.passwordConfirm, {
//   message: "Неверный пароль",
//   path: ["passwordConfirm"],
// })
