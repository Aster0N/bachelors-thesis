import { z } from "zod"
import { registrationSchema } from "../constants/formConfig"
import type { RegistrationFormData } from "../types/types"

type ValidationResult = {
  isSuccess: boolean
  errors: {
    email: string[]
    username: string[]
    password: string[]
    passwordConfirm: string[]
  }
}

export const validateRegistrationForm = (
  userFormData: RegistrationFormData
): ValidationResult => {
  const results: ValidationResult = {
    isSuccess: false,
    errors: {
      email: [],
      username: [],
      password: [],
      passwordConfirm: [],
    },
  }

  const validationData = {
    email: userFormData.email.value,
    username: userFormData.username.value,
    password: userFormData.password.value,
    passwordConfirm: userFormData.passwordConfirm.value,
  }

  try {
    registrationSchema.parse(validationData)
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
