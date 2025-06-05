import FlightTaskCard from "@/components/FlightTaskCard/FlightTaskCard"
import { FlightTaskService } from "@/modules/FlightTasks/FlightTaskService"
import { FlightTaskPreview } from "@/modules/FlightTasks/types"
import { PRIVATE_ROUTES } from "@/router/routes"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import classes from "./RoutesPage.module.scss"

const RoutesPage = () => {
  const [flightTasksData, setFlightTasksData] = useState<FlightTaskPreview[]>(
    []
  )
  const fetchData = async () => {
    const flightTasks = await FlightTaskService.fetchFlightTasksData()
    const flightTasksPreview =
      FlightTaskService.getFlightTasksPreviewData(flightTasks)
    setFlightTasksData(flightTasksPreview)
  }
  const navigate = useNavigate()

  const goToRoute = (id: string) => {
    navigate(`${PRIVATE_ROUTES.ROUTES_PATH}/${id}`)
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (!flightTasksData) {
    return <big>Загрузка...</big>
  }

  return (
    <div className={classes.flightTasksWrapper}>
      {flightTasksData.map(task => (
        <FlightTaskCard
          key={task.id}
          {...task}
          onClick={() => goToRoute(task.id)}
        />
      ))}
    </div>
  )
}

export default RoutesPage
