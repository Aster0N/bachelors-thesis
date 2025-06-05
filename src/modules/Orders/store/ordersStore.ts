import { Order, OrderStatus } from "@/types/typesEntities"
import { create } from "zustand"
import { OrdersService } from "../OrdersService"

type OrderStore = {
  orders: Order[]
  setOrdersData: (orders: Order[]) => void
  fetchOrders: () => Promise<void>
  getOrderStatus: (id: string) => OrderStatus
  updateOrderStatus: (id: string, newStatus: Order["status"]) => void
}

export const useOrderStore = create<OrderStore>((set, get) => ({
  orders: [],

  setOrdersData: orders => {
    set({ orders: orders })
  },

  fetchOrders: async () => {
    const ordersData = await OrdersService.fetchAllOrders()
    set({ orders: ordersData })
  },

  getOrderStatus: id => {
    const orderStatus = get().orders.find(order => order.id == id)
    return orderStatus?.status!
  },

  updateOrderStatus: (id, newStatus) => {
    const updatedOrders = get().orders.map(order =>
      order.id === id ? { ...order, status: newStatus } : order
    )

    set({ orders: updatedOrders })
  },
}))
