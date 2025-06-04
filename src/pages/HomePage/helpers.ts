import { FlightTaskPreview, OrdersPreview } from "@/types/typesDataPreview"
import { FlightTask, Order } from "@/types/typesEntities"

export const fetchOrdersData = async () => {
  const data = await fetch("/test_data/orders.json")
    .then(data => data.json())
    .then(json => json.orders)

  return data
}

export const fetchFlightTasksData = async () => {
  const flightTasks = await fetch("/test_data/flight_tasks.json")
    .then(data => data.json())
    .then(json => json.flight_tasks)

  return flightTasks
}

export const getOrdersPreviewData = (orders: Order[]): OrdersPreview[] => {
  return orders.map((item: Order) => ({
    date: item.order_date,
    client: `${item.first_name} ${item.last_name}`,
    email: item.email,
    status: item.status,
  }))
}

export const getFlightTasksPreviewData = (
  flightTasks: FlightTask[]
): FlightTaskPreview[] => {
  return flightTasks.map((item: FlightTask) => ({
    id: item.id,
    date: item.order.order_date,
    status: item.order.status,
  }))
}
