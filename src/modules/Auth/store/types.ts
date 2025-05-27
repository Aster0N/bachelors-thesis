export type User = {
  id: string
  email: string
  username: string | null
  is_superuser?: boolean
}

export type UserStore = {
  user: User | null
  accessToken: string | null
  setAuth: (user: User, accessToken: string) => void
  clearAuth: () => void
}
