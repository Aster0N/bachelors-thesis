import { Order } from "@/types/typesEntities"
import { useEffect, useState } from "react"
import { OrdersService } from "../../OrdersService"
import OrdersList from "../OrdersList/OrdersList"

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  const fetchData = async () => {
    const { data, total } = await OrdersService.fetchOrdersByPage(page)
    setOrders(data)
    setTotal(total)
    setTotalPages(Math.ceil(total / OrdersService.pageSize))
  }

  useEffect(() => {
    fetchData()
  }, [page])

  return (
    <div>
      <p className="_caption">всего: {total}</p>
      <OrdersList orderList={orders} />
      <div>
        <button
          onClick={() => setPage(p => Math.max(p - 1, 0))}
          disabled={page === 0}
        >
          Назад
        </button>

        <span>Страница {page + 1}</span>

        <button
          onClick={() => setPage(p => (p + 1 < totalPages ? p + 1 : p))}
          disabled={page + 1 >= totalPages}
        >
          Вперёд
        </button>
      </div>
    </div>
  )
}
export default Orders
