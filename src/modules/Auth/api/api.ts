import axios, { AxiosError } from "axios"

import { useUserStore } from "../store/userStore"

const api = axios.create({
  baseURL: "http://91.238.230.96/",
  withCredentials: true,
})

// add access_token to header
api.interceptors.request.use(config => {
  const { accessToken } = useUserStore.getState()
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

// handle errors + update token
api.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true
      try {
        const { data } = await axios.post(
          "http://91.238.230.96/login/refresh-token",
          {},
          { withCredentials: true }
        )
        const { access_token } = data
        useUserStore
          .getState()
          .setAuth(useUserStore.getState().user!, access_token)
        localStorage.setItem("access_token", access_token)
        originalRequest.headers.Authorization = `Bearer ${access_token}`
        return api(originalRequest)
      } catch (refreshError) {
        useUserStore.getState().clearAuth()
        localStorage.removeItem("access_token")
        window.location.href = "/auth"
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  }
)

export { api }