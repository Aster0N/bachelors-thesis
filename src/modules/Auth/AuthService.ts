import { api } from "@/api/api"
import { User } from "./store/types"

export class AuthService {
  static login = async (email: string, password: string) => {
    const formData = new URLSearchParams()
    formData.append("username", email)
    formData.append("password", password)

    const { data } = await api.post("/login/access-token", formData, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
    return data
  }

  static register = async (
    email: string,
    password: string,
    username?: string
  ) => {
    const { data } = await api.post<User>("/users/signup", {
      email,
      password,
      username,
    })
    return data
  }

  static fetchCurrentUser = async () => {
    const { data } = await api.get<User>("/users/me")
    return data
  }
}
