import { Camera, Drone, FlightTask } from "@/types/typesEntities"
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

  static getFlightTaskById = async (
    flightTaskId: FlightTask["id"]
  ): Promise<FlightTask | undefined> => {
    const flightTasks = await this.fetchFlightTasksData()
    const flightTask = flightTasks.find(task => task.id == flightTaskId)
    return flightTask
  }

  static getFlightTaskByOrderId = async (
    orderId: FlightTask["order"]["id"]
  ): Promise<FlightTask | undefined> => {
    const flightTasks = await this.fetchFlightTasksData()
    const flightTask = flightTasks.find(task => task.order.id == orderId)
    return flightTask
  }

  static getCameras = async (): Promise<Camera[]> => {
    const cameras = await fetch("/test_data/cameras.json")
      .then(data => data.json())
      .then(json => json.cameras)

    return cameras
  }

  static getDrones = async (): Promise<Drone[]> => {
    const cameras = await fetch("/test_data/drones.json")
      .then(data => data.json())
      .then(json => json.drones)

    return cameras
  }
}
