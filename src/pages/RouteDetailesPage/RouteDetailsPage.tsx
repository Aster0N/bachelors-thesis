import Select from "@/components/Select/Select"
import { FlightTaskService } from "@/modules/FlightTasks/FlightTaskService"
import { FlightTaskDetails } from "@/modules/FlightTasks/index"
import { PathField } from "@/modules/PathField/index"
import { usePointsStore } from "@/modules/PathField/store/pointsStore"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import classes from "./RouteDetailsPage.module.scss"

type RoutePoint = {
  sequence_number: number
  latitude: number
  longitude: number
  altitude: number
  color: string
}

type TemplateRoute = {
  id: string
  club_id: string
  points: RoutePoint[]
}

const RouteDetailsPage = () => {
  const { id } = useParams()
  const [templateRoutes, setTemplateRoutes] = useState<TemplateRoute[]>([])
  const [clubTemplates, setClubTemplates] = useState<TemplateRoute[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")
  const [flightTaskClubId, setFlightTaskClubId] = useState<string | null>(null)
  const [useTemplate, setUseTemplate] = useState<boolean>(false)

  const { setPoints } = usePointsStore()

  useEffect(() => {
    const fetchFlightTask = async () => {
      if (!id) return
      const flightTask = await FlightTaskService.getFlightTaskById(id)
      if (flightTask) {
        usePointsStore.getState().setPointsForRoute(flightTask.route)
        setFlightTaskClubId(flightTask.route.club_id)
      }
    }

    fetchFlightTask()
  }, [id])

  useEffect(() => {
    const fetchRoutes = async () => {
      const data = await fetch("/test_data/routes.json")
        .then(res => res.json())
        .then(json => json.routes as TemplateRoute[])

      setTemplateRoutes(data)
    }

    fetchRoutes()
  }, [])

  useEffect(() => {
    if (flightTaskClubId && templateRoutes.length) {
      const filtered = templateRoutes.filter(
        route => route.club_id === flightTaskClubId
      )
      setClubTemplates(filtered)
    }
  }, [flightTaskClubId, templateRoutes])

  const handleSelectTemplate = (value: string) => {
    setSelectedTemplate(value)
    const selected = clubTemplates.find(
      (_, index) => `Шаблон ${index + 1}` === value
    )
    if (selected) {
      const points = selected.points.map(p => ({
        uid: `${p.latitude}-${p.longitude}-${p.altitude}`,
        x: p.latitude,
        y: p.longitude,
        z: p.altitude,
        hex: p.color,
      }))
      const pointsObj = points.reduce((acc, point) => {
        acc[point.uid] = point
        return acc
      }, {} as Record<string, (typeof points)[number]>)

      setPoints(pointsObj)
    }
  }

  const handleUseTemplateToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const enabled = e.target.checked
    setUseTemplate(enabled)

    if (!enabled && id) {
      setSelectedTemplate("")
      FlightTaskService.getFlightTaskById(id).then(flightTask => {
        if (flightTask) {
          usePointsStore.getState().setPointsForRoute(flightTask.route)
        }
      })
    }
  }

  if (!id) return <big>Загрузка...</big>

  return (
    <>
      <h2>Маршрут #{id}</h2>
      <div className={classes.wrapper}>
        <h3 className={classes.heading}>#{id.slice(-4)}</h3>
        <div className={classes.flightTaskContainer}>
          <FlightTaskDetails flightTaskId={id} />
          <div className={classes.fieldManagement}>
            <PathField />
            <div>
              <div className={classes.checkboxBlock}>
                <label>
                  <input
                    type="checkbox"
                    checked={useTemplate}
                    onChange={handleUseTemplateToggle}
                  />
                  Использовать шаблон маршрута
                </label>
              </div>

              {useTemplate && clubTemplates.length > 0 && (
                <div className={classes.templatesSelector}>
                  <Select
                    value={selectedTemplate}
                    options={clubTemplates.map(
                      (_, index) => `Шаблон ${index + 1}`
                    )}
                    onChange={handleSelectTemplate}
                    placeholder="Выберите шаблон маршрута"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RouteDetailsPage
