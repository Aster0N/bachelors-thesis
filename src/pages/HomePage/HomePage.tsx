import DynamicTable from "@/components/DynamicTable/DynamicTable"
import { useEffect, useState } from "react"
import {
  fetchFlightTasksData,
  fetchOrdersData,
  getOrdersPreviewData,
} from "./helpers"
import { OrdersPreview } from "./types"

const HomePage = () => {
  const [ordersDataPreview, setOrdersDataPreview] = useState<OrdersPreview[]>()

  const fetchData = async () => {
    const ordersData = await fetchOrdersData()
    const flightTasksData = await fetchFlightTasksData()

    const ordersPreviewData: OrdersPreview[] = getOrdersPreviewData(ordersData)

    setOrdersDataPreview(ordersPreviewData)
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
    </div>
  )
}

export default HomePage
