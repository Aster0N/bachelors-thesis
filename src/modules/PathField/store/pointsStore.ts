import type { Points } from "@/types/points"
import { Route } from "@/types/typesEntities"
import { create } from "zustand"
import PointsService from "../services/PointsService/PointService"

type PointsStore = {
  points: Points
  setPoints: (points: Points) => void
  setPointsForRoute: (route: Route) => void
  removePoint: (uid: string) => void
}

export const usePointsStore = create<PointsStore>((set, get) => ({
  points: {},

  setPoints: newPoints => {
    set({ points: newPoints })
  },

  setPointsForRoute: route => {
    const newPoints: Points = {}
    route.points.forEach(point => {
      const coords = {
        x: point.latitude,
        y: point.longitude,
        z: point.altitude,
      }
      const uid = PointsService.generateUId(coords)
      newPoints[uid] = {
        uid,
        x: coords.x,
        y: coords.y,
        z: coords.z,
        hex: point.color,
      }
    })
    set({ points: newPoints })
  },

  removePoint: uid => {
    const updated = { ...get().points }
    delete updated[uid]
    set({ points: updated })
  },
}))
