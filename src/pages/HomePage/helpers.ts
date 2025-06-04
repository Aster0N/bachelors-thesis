import { OrdersPreview, OrdersResponse } from "./types"

export const fetchOrdersData = async () => {
  const ordersData = await fetch("/test_data/orders.json")
    .then(data => data.json())
    .then(json => json.orders)

  return ordersData
}

export const fetchFlightTasksData = async () => {
  const flightTasks = await fetch("/test_data/flight_tasks.json")
    .then(data => data.json())
    .then(json => json.flight_tasks)

  return flightTasks
}

export const getOrdersPreviewData = (
  orders: OrdersResponse[]
): OrdersPreview[] => {
  return orders.map((item: OrdersResponse) => ({
    date: item.order_date,
    client: `${item.first_name} ${item.last_name}`,
    email: item.email,
    status: item.status,
  }))
}
