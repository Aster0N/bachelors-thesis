import type { Points } from "@/types/points"
import { create } from "zustand"

type PointsStore = {
  points: Points
  setPoints: (points: Points) => void
  removePoint: (uid: string) => void
}

export const usePointsStore = create<PointsStore>((set, get) => ({
  points: {},

  setPoints: (newPoints: Points) => {
    set({ points: newPoints })
  },

  removePoint: uid => {
    const updated = { ...get().points }
    delete updated[uid]
    set({ points: updated })
  },
}))
