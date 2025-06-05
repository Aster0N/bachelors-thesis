import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { useEffect, useState } from "react"
import { MapContainer, Marker, TileLayer } from "react-leaflet"
import SvgOverlay from "../SVGOverlay/SVGOverlay"

type Props = {
  clubId: string
  zoom?: number
}

type Club = {
  id: string
  name: string
  latitude: number
  longitude: number
}

const MapWithOverlay: React.FC<Props> = ({ clubId, zoom = 16 }) => {
  const [center, setCenter] = useState<[number, number] | null>(null)
  // const { points } = usePointsStore()

  useEffect(() => {
    fetch("/test_data/clubs.json")
      .then(res => res.json())
      .then(json => {
        const club: Club | undefined = json.clubs.find(
          (c: Club) => c.id === clubId
        )
        if (club) {
          setCenter([club.latitude, club.longitude])
        }
      })
  }, [clubId])

  if (!center) return <p>Загрузка карты...</p>

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker
        position={center}
        icon={L.icon({ iconUrl: "/vite.svg", iconSize: [0, 0] })}
      />

      <SvgOverlay />
    </MapContainer>
  )
}

export default MapWithOverlay
