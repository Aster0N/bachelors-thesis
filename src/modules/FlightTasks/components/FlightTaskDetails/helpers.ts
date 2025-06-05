import { FlightTask } from "@/types/typesEntities"
import { FlightTaskService } from "../../FlightTaskService"

export type StructuredFlightTasks = {
  heading: string
  rows: {
    label: string
    data: string
    isSelect?: boolean
    options?: string[]
  }[]
  linkId?: string
  type?: string
}[]

export const structureFlightTaskData = async (
  flightTask: FlightTask
): Promise<StructuredFlightTasks> => {
  const cameras = await FlightTaskService.getCameras()
  const drones = await FlightTaskService.getDrones()
  const cameraOptions = cameras.map(cam => cam.model).slice(0, 10)
  const dronesOptions = drones.map(drone => drone.model).slice(0, 8)

  return [
    {
      heading: `К заказу #${flightTask.order.id.slice(-4)}`,
      rows: [
        { label: "email", data: flightTask.order.email },
        {
          label: "клиент",
          data: `${flightTask.order.first_name} ${flightTask.order.last_name}`,
        },
      ],
      linkId: flightTask.order.id,
      type: "link",
    },
    {
      heading: "Настройки видеосъёмки",
      rows: [
        {
          label: "видеокамера",
          data: flightTask.camera.model,
          isSelect: true,
          options: cameraOptions,
        },
        {
          label: "время мероприятия",
          data: `${flightTask.order.start_time} - ${flightTask.order.end_time}`,
        },
        {
          label: "разрешение",
          data: `${flightTask.camera.height_px} x ${flightTask.camera.width_px}`,
        },
        { label: "fps", data: `${flightTask.camera.fps}` },
      ],
    },
    {
      heading: "Квадрокоптер",
      rows: [
        {
          label: "модель",
          data: flightTask.drone.model,
          isSelect: true,
          options: dronesOptions,
        },
        {
          label: "id",
          data: flightTask.drone.id,
        },
      ],
    },
    {
      heading: "Клуб",
      rows: [
        {
          label: "название",
          data: flightTask.order.club_name,
        },
        {
          label: "адрес",
          data: flightTask.order.club_address,
        },
        {
          label: "id",
          data: flightTask.order.club_id,
        },
      ],
    },
  ]
}
