import DynamicTable from "@/components/DynamicTable/DynamicTable"
import { FlightTaskService } from "@/modules/FlightTasks/FlightTaskService"
import { FlightTask } from "@/types/typesEntities"
import { useEffect, useState } from "react"
import classes from "./HistoryPage.module.scss"

type HistoryTableRow = {
  date: string
  club: string
  camera: string
  quality: string
  drone: string
  email: string
}

const HistoryPage = () => {
  const [rows, setRows] = useState<HistoryTableRow[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const tasks: FlightTask[] = await FlightTaskService.fetchFlightTasksData()

      const data: HistoryTableRow[] = tasks.map(task => ({
        date: task.order.order_date,
        club: task.order.club_name,
        camera: task.camera.model,
        quality: `${task.camera.height_px}x${task.camera.width_px}`,
        drone: task.drone.model,
        email: task.order.email,
      }))

      setRows(data)
    }

    fetchData()
  }, [])

  const columns = [
    { key: "date", label: "Дата" },
    { key: "club", label: "Клуб" },
    { key: "camera", label: "Камера" },
    { key: "quality", label: "Качество" },
    { key: "drone", label: "Квадрокоптер" },
    { key: "email", label: "Почта клиента" },
  ] as { key: keyof HistoryTableRow; label: string }[]

  return (
    <div className={classes.historyPage}>
      <h2>История полётов</h2>
      <DynamicTable columns={columns} data={rows} />
    </div>
  )
}

export default HistoryPage
