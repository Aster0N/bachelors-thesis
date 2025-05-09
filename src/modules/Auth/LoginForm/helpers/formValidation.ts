import { z } from "zod"
import { loginSchema } from "../constants/formConfig"
import type { LoginFormData } from "../types/types"

// type FormValidatorProps = {
//   name: string | keyof LoginFormData
//   value: string
// }
type ValidationResult = {
  isSuccess: boolean
  errors: {
    email: string[]
    password: string[]
  }
}

export const validateLoginForm = (
  userFormData: LoginFormData
): ValidationResult => {
  const results: ValidationResult = {
    isSuccess: false,
    errors: {
      email: [],
      password: [],
    },
  }

  const validationData = {
    email: userFormData.email.value,
    password: userFormData.password.value,
  }

  try {
    loginSchema.parse(validationData)
    results.isSuccess = true
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.errors.forEach(err => {
        const field = err.path[0] as keyof typeof validationData
        if (userFormData[field].isDirty) {
          results.errors[field].push(err.message)
          results.isSuccess = false
        }
      })
    } else {
      results.isSuccess = false
    }
  }

  return results
}
