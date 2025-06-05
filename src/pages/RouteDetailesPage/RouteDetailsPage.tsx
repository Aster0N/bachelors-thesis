import FlightTaskDetails from "@/modules/FlightTasks/components/FlightTaskDetails/FlightTaskDetails"
import { useParams } from "react-router-dom"

const RouteDetailsPage = () => {
  const { id } = useParams()

  if (!id) {
    return <big>Загрузка...</big>
  }

  return (
    <div>
      <h2>Маршрут #{id}</h2>
      <FlightTaskDetails flightTaskId={id} />
    </div>
  )
}

export default RouteDetailsPage
