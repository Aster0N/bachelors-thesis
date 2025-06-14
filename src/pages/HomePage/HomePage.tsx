import DynamicTable from "@/components/DynamicTable/DynamicTable"
import FlightTaskCard from "@/components/FlightTaskCard/FlightTaskCard"
import { FlightTaskService } from "@/modules/FlightTasks/FlightTaskService"
import { FlightTaskPreview } from "@/modules/FlightTasks/types"
import { OrdersService } from "@/modules/Orders/OrdersService"
import { OrdersPreview } from "@/modules/Orders/types"
import { PRIVATE_ROUTES } from "@/router/routes"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import classes from "./HomePage.module.scss"

const HomePage = () => {
  const [ordersDataPreview, setOrdersDataPreview] = useState<OrdersPreview[]>()
  const [flightTasksDataPreview, setFlightTasksDataPreview] =
    useState<FlightTaskPreview[]>()

  const fetchData = async () => {
    const ordersData = await OrdersService.fetchAllOrders()
    const flightTasksData = await FlightTaskService.fetchFlightTasksData()

    const ordersPreviewData: OrdersPreview[] =
      OrdersService.getOrdersPreviewData(ordersData)
    const flightTasksPreviewData: FlightTaskPreview[] =
      FlightTaskService.getFlightTasksPreviewData(flightTasksData, 2)

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
          <>
            <DynamicTable columns={columns} data={ordersDataPreview} />
            <Link to={PRIVATE_ROUTES.ORDERS_PATH}>смотреть все...</Link>
          </>
        )}
      </div>
      <h2>Маршруты</h2>
      {flightTasksDataPreview && (
        <>
          <div className={classes.flightTaskPreview}>
            {flightTasksDataPreview.map(task => (
              <FlightTaskCard key={task.id} {...task} />
            ))}
          </div>
          <Link to={PRIVATE_ROUTES.ROUTES_PATH}>смотреть все...</Link>
        </>
      )}
    </div>
  )
}

export default HomePage
