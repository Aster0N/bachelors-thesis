import { Order, OrderStatus } from "@/types/typesEntities"
import { create } from "zustand"
import { OrdersService } from "../OrdersService"

type OrderStore = {
  allOrders: Order[]
  pageOrders: Order[]
  total: number
  page: number
  pageSize: number
  getOrderStatus: (id: string) => OrderStatus
  fetchOrders: () => Promise<void>
  setPage: (page: number) => void
  updateOrderStatus: (id: string, newStatus: Order["status"]) => void
}

const LOCAL_STORAGE_KEY = "orders_store"

export const useOrderStore = create<OrderStore>((set, get) => ({
  allOrders: [],
  pageOrders: [],
  total: 0,
  page: Number(localStorage.getItem("orders_page")) || 0,
  pageSize: 5,

  getOrderStatus: id => {
    const orderStatus = get().allOrders.find(order => order.id == id)
    return orderStatus?.status!
  },

  fetchOrders: async () => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
    let orders: Order[]

    if (saved) {
      orders = JSON.parse(saved)
    } else {
      orders = await OrdersService.fetchAllOrders()
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(orders))
    }

    const { page, pageSize } = get()
    const start = page * pageSize
    const end = start + pageSize

    set({
      allOrders: orders,
      pageOrders: orders.slice(start, end),
      total: orders.length,
    })
  },

  setPage: (newPage: number) => {
    const { allOrders, pageSize } = get()
    const start = newPage * pageSize
    const end = start + pageSize

    localStorage.setItem("orders_page", String(newPage))

    set({
      page: newPage,
      pageOrders: allOrders.slice(start, end),
    })
  },

  updateOrderStatus: (id, newStatus) => {
    const updatedAll = get().allOrders.map(order =>
      order.id === id ? { ...order, status: newStatus } : order
    )

    const { page, pageSize } = get()
    const start = page * pageSize
    const end = start + pageSize

    const updatedPage = updatedAll.slice(start, end)

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedAll))

    set({
      allOrders: updatedAll,
      pageOrders: updatedPage,
    })
  },
}))
