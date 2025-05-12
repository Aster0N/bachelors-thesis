export type FormField = {
  value: string
  error: string
  isDirty: boolean
}

export type RegistrationFormData = {
  email: FormField
	username: FormField
  password: FormField
	passwordConfirm: FormField
}
