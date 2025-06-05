//import { api } from "@/api/api"
import { OrdersPreview } from "@/types/typesDataPreview"
import { Order } from "@/types/typesEntities"

export class OrdersService {
  public static pageSize = 5

  static fetchAllOrders = async (): Promise<Order[]> => {
    const json = await fetch("/test_data/orders.json").then(res => res.json())
    return json.orders as Order[]
  }

  static fetchOrdersByPage = async (
    page: number
  ): Promise<{ data: Order[]; total: number }> => {
    const allOrders = await this.fetchAllOrders()
    const total = allOrders.length

    const start = page * this.pageSize
    const end = start + this.pageSize
    const data = allOrders.slice(start, end)

    return { data, total }
  }

  static getOrdersPreviewData = (orders: Order[]): OrdersPreview[] => {
    return orders
      .map((item: Order) => ({
        date: item.order_date,
        client: `${item.first_name} ${item.last_name}`,
        email: item.email,
        status: item.status,
      }))
      .slice(0, 5)
  }
}
