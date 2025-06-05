import DynamicTable from "@/components/DynamicTable/DynamicTable"
import { FlightTaskService } from "@/modules/FlightTasks/FlightTaskService"
import { FlightTask } from "@/types/typesEntities"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { useEffect, useState } from "react"
import classes from "./ReportsPage.module.scss"

type ReportsTableRow = {
  date: string
  club: string
  camera: string
  quality: string
  drone: string
  email: string
}

const ReportsPage = () => {
  const [allTasks, setAllTasks] = useState<FlightTask[]>([])
  const [filteredRows, setFilteredRows] = useState<ReportsTableRow[]>([])

  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const downloadPdf = () => {
    const doc = new jsPDF()

    doc.text("Отчёт по полётам", 14, 16)

    autoTable(doc, {
      startY: 20,
      head: [columns.map(c => c.label)],
      body: filteredRows.map(row => columns.map(c => String(row[c.key]))),
      styles: { fontSize: 9 },
    })

    doc.save("flight-report.pdf")
  }

  useEffect(() => {
    const fetchData = async () => {
      const tasks = await FlightTaskService.fetchFlightTasksData()
      setAllTasks(tasks)
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (!startDate || !endDate) return

    const start = new Date(startDate)
    const end = new Date(endDate)

    const rows: ReportsTableRow[] = allTasks
      .filter(task => {
        const date = new Date(task.order.order_date)
        return date >= start && date <= end
      })
      .map(task => ({
        date: task.order.order_date,
        club: task.order.club_name,
        camera: task.camera.model,
        quality: `${task.camera.height_px}x${task.camera.width_px}`,
        drone: task.drone.model,
        email: task.order.email,
      }))

    setFilteredRows(rows)
  }, [startDate, endDate, allTasks])

  const columns = [
    { key: "date", label: "Дата" },
    { key: "club", label: "Клуб" },
    { key: "camera", label: "Камера" },
    { key: "quality", label: "Качество" },
    { key: "drone", label: "Квадрокоптер" },
    { key: "email", label: "Почта клиента" },
  ] as { key: keyof ReportsTableRow; label: string }[]

  return (
    <div className={classes.reportsPage}>
      <h2>Отчёты по полётам</h2>

      <div className={classes.filters}>
        <label>
          С:
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
          />
        </label>

        <label>
          По:
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
          />
        </label>
      </div>

      {!startDate || !endDate ? (
        <p className="_caption">Выберите период дат для отображения отчёта</p>
      ) : (
        <DynamicTable columns={columns} data={filteredRows} />
      )}

      {startDate && endDate && filteredRows.length > 0 && (
        <div className={classes.download}>
          <button onClick={downloadPdf}>Скачать PDF</button>
        </div>
      )}
    </div>
  )
}

export default ReportsPage
