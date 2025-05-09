type FormField = {
  value: string
  error: string
  isDirty: boolean
}

export type LoginFormData = {
  email: FormField
  password: FormField
}
