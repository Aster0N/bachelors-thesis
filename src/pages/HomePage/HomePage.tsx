import DynamicTable from "@/components/DynamicTable/DynamicTable"
import FlightTaskCard from "@/components/FlightTaskCard/FlightTaskCard"
import { OrdersService } from "@/modules/Orders/OrdersService"
import { PRIVATE_ROUTES } from "@/router/routes"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { FlightTaskPreview, OrdersPreview } from "../../types/typesDataPreview"
import { fetchFlightTasksData, getFlightTasksPreviewData } from "./helpers"
import classes from "./HomePage.module.scss"

const HomePage = () => {
  const [ordersDataPreview, setOrdersDataPreview] = useState<OrdersPreview[]>()
  const [flightTasksDataPreview, setFlightTasksDataPreview] =
    useState<FlightTaskPreview[]>()

  const fetchData = async () => {
    const ordersData = await OrdersService.fetchAllOrders()
    const flightTasksData = await fetchFlightTasksData()

    const ordersPreviewData: OrdersPreview[] =
      OrdersService.getOrdersPreviewData(ordersData)
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
