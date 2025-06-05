import L from "leaflet"
import { useEffect, useState } from "react"
import { useMap } from "react-leaflet"
import { usePointsStore } from "../../store/pointsStore"

const SVGOverlay = () => {
  const map = useMap()
  const { points } = usePointsStore()
  const [positions, setPositions] = useState<
    { x: number; y: number; uid: string; hex: string }[]
  >([])

  useEffect(() => {
    const projected = Object.values(points).map(p => {
      const latlng = L.latLng(p.x, p.y)
      const point = map.latLngToContainerPoint(latlng)
      return { x: point.x, y: point.y, uid: p.uid, hex: p.hex }
    })
    setPositions(projected)
  }, [points, map])

  return (
    <svg
      style={{
        position: "absolute",
        pointerEvents: "none",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 400,
      }}
    >
      {positions.map(p => (
        <circle key={p.uid} cx={p.x} cy={p.y} r={5} fill={p.hex} />
      ))}
    </svg>
  )
}

export default SVGOverlay
