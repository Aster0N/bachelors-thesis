import DynamicTable from "@/components/DynamicTable/DynamicTable"
import FlightTaskCard from "@/components/FlightTaskCard/FlightTaskCard"
import { useEffect, useState } from "react"
import {
  fetchFlightTasksData,
  fetchOrdersData,
  getFlightTasksPreviewData,
  getOrdersPreviewData,
} from "./helpers"
import classes from "./HomePage.module.scss"
import { FlightTaskPreview, OrdersPreview } from "./types"

const HomePage = () => {
  const [ordersDataPreview, setOrdersDataPreview] = useState<OrdersPreview[]>()
  const [flightTasksDataPreview, setFlightTasksDataPreview] =
    useState<FlightTaskPreview[]>()

  const fetchData = async () => {
    const ordersData = await fetchOrdersData()
    const flightTasksData = await fetchFlightTasksData()

    const ordersPreviewData: OrdersPreview[] = getOrdersPreviewData(ordersData)
    const flightTasksPreviewData: FlightTaskPreview[] =
      getFlightTasksPreviewData(flightTasksData)

    setOrdersDataPreview(ordersPreviewData)
    setFlightTasksDataPreview(flightTasksPreviewData)
  }

  const columns: { key: keyof OrdersPreview; label: string }[] = [
    { key: "date", label: "Дата" },
    { key: "client", label: "Клиент" },
    { key: "email", label: "Почта" },
    { key: "status", label: "Статус" },
  ]

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <h2>Заявки</h2>
      <div>
        {ordersDataPreview && (
          <DynamicTable columns={columns} data={ordersDataPreview} />
        )}
      </div>
      <h2>Маршруты</h2>
      <div className={classes.flightTaskPreview}>
        {flightTasksDataPreview &&
          flightTasksDataPreview.map(task => (
            <FlightTaskCard key={task.id} {...task} />
          ))}
      </div>
    </div>
  )
}

export default HomePage
