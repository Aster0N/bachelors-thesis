import { FlightTaskPreview } from "@/types/typesDataPreview"
import { FlightTask } from "@/types/typesEntities"

export const fetchFlightTasksData = async () => {
  const flightTasks = await fetch("/test_data/flight_tasks.json")
    .then(data => data.json())
    .then(json => json.flight_tasks)

  return flightTasks
}

export const getFlightTasksPreviewData = (
  flightTasks: FlightTask[]
): FlightTaskPreview[] => {
  return flightTasks
    .map((item: FlightTask) => ({
      id: item.id,
      date: item.order.order_date,
      status: item.order.status,
    }))
    .slice(0, 2)
}
