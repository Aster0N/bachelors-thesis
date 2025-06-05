import { FlightTaskService } from "@/modules/FlightTasks/FlightTaskService"
import { FlightTaskDetails } from "@/modules/FlightTasks/index"
import { PathField } from "@/modules/PathField/index"
import { usePointsStore } from "@/modules/PathField/store/pointsStore"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import classes from "./RouteDetailsPage.module.scss"

const RouteDetailsPage = () => {
  const { id } = useParams()

  if (!id) {
    return <big>Загрузка...</big>
  }

  useEffect(() => {
    const fetchFlightTask = async () => {
      const flightTask = await FlightTaskService.getFlightTaskById(id)
      if (flightTask) {
        console.log(flightTask.route)
        usePointsStore.getState().setPointsForRoute(flightTask.route)
      }
    }

    fetchFlightTask()
  }, [id])

  return (
    <>
      <h2>Маршрут #{id}</h2>
      <div className={classes.wrapper}>
        <h3 className={classes.heading}>#{id.slice(-4)}</h3>
        <div className={classes.flightTaskContainer}>
          <FlightTaskDetails flightTaskId={id} />
          <PathField />
        </div>
      </div>
    </>
  )
}

export default RouteDetailsPage
