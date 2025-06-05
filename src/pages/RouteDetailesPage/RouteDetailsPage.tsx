import { FlightTaskDetails } from "@/modules/FlightTasks/index"
import { useParams } from "react-router-dom"
import classes from "./RouteDetailsPage.module.scss"

const RouteDetailsPage = () => {
  const { id } = useParams()

  if (!id) {
    return <big>Загрузка...</big>
  }

  return (
    <>
      <h2>Маршрут #{id}</h2>
      <div className={classes.wrapper}>
        <h3 className={classes.heading}>#{id.slice(-4)}</h3>
        <FlightTaskDetails flightTaskId={id} />
      </div>
    </>
  )
}

export default RouteDetailsPage
