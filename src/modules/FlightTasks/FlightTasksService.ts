import { FlightTask } from "@/types/typesEntities"
import { FlightTaskPreview } from "./types"

export class FlightTaskService {
  static fetchFlightTasksData = async (): Promise<FlightTask[]> => {
    const flightTasks = await fetch("/test_data/flight_tasks.json")
      .then(data => data.json())
      .then(json => json.flight_tasks)

    return flightTasks
  }

  static getFlightTasksPreviewData = (
    flightTasks: FlightTask[],
    count?: number
  ): FlightTaskPreview[] => {
    const data = flightTasks.map((item: FlightTask) => ({
      id: item.id,
      date: item.order.order_date,
      status: item.order.status,
    }))

    if (count) {
      return data.slice(0, count)
    }

    return data
  }
}
