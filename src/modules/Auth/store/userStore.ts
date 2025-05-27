import { create } from "zustand"
import type { UserStore } from "./types"

export const useUserStore = create<UserStore>(set => ({
  user: null,
  accessToken: null,
  setAuth: (user, accessToken) => set({ user, accessToken }),
  clearAuth: () => set({ user: null, accessToken: null }),
}))
