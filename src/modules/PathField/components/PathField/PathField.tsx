import Button from "@/components/Button/Button"
import ColorDropdown from "@/components/ColorDropdown/ColorDropDown"
import ContextMenu from "@/components/ContextMenu/ContextMenu"
import Input from "@/components/Input/Input"
import type { Point } from "@/types/points"
import { LockKeyhole, LockKeyholeOpen } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { initialPointInfo } from "../../consts"
import PointsService from "../../services/PointsService/PointService"
import SVGFieldService from "../../services/SVGFieldService/SVGFieldService"
import { usePointsStore } from "../../store/pointsStore"
import classes from "./PathField.module.scss"
// import Img1 from "/img/field1.png"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { MapContainer, Marker, TileLayer, useMapEvent } from "react-leaflet"

import { useMap } from "react-leaflet"

const MapEvents = ({
  onInit,
  onMove,
}: {
  onInit?: (map: L.Map) => void
  onMove?: (map: L.Map) => void
}) => {
  const map = useMap()

  useEffect(() => {
    if (onInit) onInit(map)
  }, [map, onInit])

  useMapEvent("move", () => {
    if (onMove) onMove(map)
  })

  return null
}

const PathField = ({ mapCenter }: { mapCenter: [number, number] }) => {
  const [map, setMap] = useState<L.Map | null>(null) // 🔧 для доступа к карте
  const [svgOffset, setSvgOffset] = useState({ x: 0, y: 0 }) // 🔧 для позиционирования SVG
  const svgContainerRef = useRef<HTMLDivElement | null>(null) // 🔧 новый ref

  const svgRef = useRef<SVGSVGElement | null>(null)
  const [isContextMenuOpen, setIsContextMenuOpen] = useState<boolean>(false)
  const [contextMenuPointInfo, setContextMenuPointInfo] =
    useState<Point>(initialPointInfo)
  const [isEditable, setIsEditable] = useState<boolean>(false)
  const [lockSVGField, setLockSVGField] = useState<boolean>(false)

  const { points, setPoints, removePoint } = usePointsStore()
  const svgControlsDisabled =
    isContextMenuOpen || !Object.keys(points).length || lockSVGField

  useEffect(() => {
    SVGFieldService.drawPoint(svgRef, points, isEditable)
    SVGFieldService.drawCurve(svgRef, points)

    if (isEditable) {
      SVGFieldService.dragPoint(svgRef, points, updateCoords)
    }
  }, [points, isEditable])

  const updateCoords = (point: Point) => {
    const updatedPoints = PointsService.updateCoords(point, points)
    setPoints(updatedPoints)
  }

  const addPoint = (event: React.MouseEvent<SVGSVGElement>) => {
    if (isContextMenuOpen) {
      setIsContextMenuOpen(false)
      return
    }
    const newPoint = PointsService.addPoint(svgRef, event, points)
    if (!newPoint) {
      return
    }
    if (map) {
      const latlng = svgToLatLng(newPoint.x, newPoint.y, map)
    }
    setPoints({
      ...points,
      [newPoint.uid]: {
        uid: newPoint.uid,
        x: newPoint.x,
        y: newPoint.y,
        z: initialPointInfo.z,
        hex: newPoint.hex,
      },
    })
  }

  const clearField = () => {
    SVGFieldService.clearField(svgRef)
    setPoints({})
    setIsEditable(false)
  }

  const openContextMenu = (event: React.MouseEvent) => {
    if (!(event.target instanceof SVGCircleElement)) {
      setIsContextMenuOpen(false)
      return
    }
    event.preventDefault()
    setIsEditable(false)
    const circleElement = event.target as SVGCircleElement
    const pointData = (circleElement as any).__data__
    setContextMenuPointInfo({
      uid: pointData.uid,
      x: event.clientX,
      y: event.clientY,
      z: pointData.z,
      hex: pointData.hex,
    })
    /*
		 ! executes faster than setContextMenuPointInfo
		 ? solved by adding key to ColorDropdown for force rerender
		*/
    setIsContextMenuOpen(true)
  }

  const deletePoint = () => {
    SVGFieldService.deletePoint(svgRef, contextMenuPointInfo.uid)
    removePoint(contextMenuPointInfo.uid)
    SVGFieldService.drawCurve(svgRef, points)
    setIsContextMenuOpen(false)
  }

  const closeContextMenu = () => {
    setContextMenuPointInfo(initialPointInfo)
    setIsContextMenuOpen(false)
  }

  const handleSelectColorChange = (color: string) => {
    SVGFieldService.paintPoint(svgRef, color, contextMenuPointInfo.uid)
    const updatedPoints = PointsService.updatePointColor(
      contextMenuPointInfo.uid,
      color,
      points
    )
    setPoints(updatedPoints)
  }

  const changeZCoord = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newZ = Number(e.target.value)
    const updatedPoints = {
      ...points,
      [contextMenuPointInfo.uid]: {
        ...points[contextMenuPointInfo.uid],
        z: newZ,
      },
    }
    setPoints(updatedPoints)
    setContextMenuPointInfo(prev => ({
      ...prev,
      z: newZ,
    }))
  }

  const svgToLatLng = (x: number, y: number, map: L.Map): L.LatLng => {
    const container = map.getContainer()
    const point = L.point(
      x + container.getBoundingClientRect().left,
      y + container.getBoundingClientRect().top
    )
    return map.unproject(point, map.getZoom())
  }

  // 🔧 при перемещении карты пересчитываем SVG offset
  const handleMapMove = (mapInstance: L.Map) => {
    if (!svgContainerRef.current) return
    const topLeft = mapInstance.containerPointToLayerPoint([0, 0])
    const newOffset = { x: topLeft.x, y: topLeft.y }

    // 🔧 Обновляем offset только если он изменился
    setSvgOffset(prevOffset => {
      if (prevOffset.x !== newOffset.x || prevOffset.y !== newOffset.y) {
        return newOffset
      }
      return prevOffset
    })
  }

  useEffect(() => {
    if (map) {
      map.setView(mapCenter, map.getZoom()) // 🔧 перемещаем карту вручную
    }
  }, [mapCenter])

  return (
    <div className={classes.pathField}>
      {isContextMenuOpen && (
        <ContextMenu
          coords={{
            x: contextMenuPointInfo.x,
            y: contextMenuPointInfo.y,
            z: contextMenuPointInfo.z,
          }}
          onClose={closeContextMenu}
        >
          <Input
            type="number"
            label="высота"
            value={contextMenuPointInfo.z}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              changeZCoord(e)
            }
            className={classes.inputCoordChange}
          />
          <ColorDropdown
            key={contextMenuPointInfo?.uid}
            selected={contextMenuPointInfo?.hex}
            onChange={handleSelectColorChange}
          ></ColorDropdown>
          <Button onClick={deletePoint}>delete</Button>
        </ContextMenu>
      )}

      <div style={{ position: "relative", width: "100%", height: "45vh" }}>
        {/* Карта — ФОН */}
        <MapContainer
          center={mapCenter}
          zoom={18}
          scrollWheelZoom={false}
          dragging={true}
          zoomControl={false}
          doubleClickZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <Marker
            position={mapCenter}
            icon={L.icon({
              iconUrl:
                "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })}
          />
          <MapEvents
            onInit={mapInstance => setMap(mapInstance)}
            onMove={handleMapMove}
          />
        </MapContainer>

        {/* SVG поверх карты */}
        <svg
          className={classes.field}
          ref={svgRef}
          onClick={addPoint}
          onContextMenu={openContextMenu}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 400,
            pointerEvents: lockSVGField ? "none" : "all",
            width: "100%",
            height: "100%",
          }}
        />
      </div>

      <div className={classes.actions}>
        <Button
          onClick={() => setIsEditable(!isEditable)}
          disabled={svgControlsDisabled}
        >
          {isEditable ? "сохранить" : "изменить маршрут"}
        </Button>
        <Button
          className={lockSVGField ? classes.lockedFieldBtn : ""}
          onClick={() => setLockSVGField(!lockSVGField)}
        >
          <span>заблокировать поле</span>
          {lockSVGField ? (
            <LockKeyhole size={20} />
          ) : (
            <LockKeyholeOpen size={20} />
          )}
        </Button>
        <Button
          className={classes.clearBtn}
          onClick={clearField}
          disabled={svgControlsDisabled}
        >
          очистить
        </Button>
      </div>
    </div>
  )
}

export { PathField }
