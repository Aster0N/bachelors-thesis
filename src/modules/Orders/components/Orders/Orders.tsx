import { useEffect, useState } from "react"
import { OrdersService } from "../../OrdersService"
import { useOrderStore } from "../../store/ordersStore"
import OrderPreview from "../OrderPreview/OrderPreview"
import OrdersList from "../OrdersList/OrdersList"
import PaginationControls from "../PaginationControls/PaginationControls"
import classes from "./Orders.module.scss"

const Orders = () => {
  // const [orders, setOrders] = useState<Order[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(
    () => Number(localStorage.getItem("orders_page")) || 0
  )
  const { orders, setOrdersData } = useOrderStore()
  const [totalPages, setTotalPages] = useState(0)
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(() =>
    localStorage.getItem("selected_order_id")
  )
  const selectedOrder = orders.find(order => order.id === selectedOrderId)

  const fetchData = async () => {
    const { data, total } = await OrdersService.fetchOrdersByPage(page)
    // setOrders(data)
    setOrdersData(data)
    setTotal(total)
    setTotalPages(Math.ceil(total / OrdersService.pageSize))
  }

  const handleSelectOrder = (id: string) => {
    setSelectedOrderId(id)
    localStorage.setItem("selected_order_id", id)
  }

  const nextPage = () => {
    setPage(prev => {
      const newPage = Math.min(prev + 1, totalPages - 1)
      localStorage.setItem("orders_page", String(newPage))
      return newPage
    })
  }

  const prevPage = () => {
    setPage(prev => {
      const newPage = Math.max(prev - 1, 0)
      localStorage.setItem("orders_page", String(newPage))
      return newPage
    })
  }

  useEffect(() => {
    fetchData()
  }, [page])

  return (
    <>
      <p className="_caption">всего: {total}</p>
      <div className={classes.ordersModule}>
        <div className={classes.ordersList}>
          <div>
            <OrdersList
              orderList={orders}
              onSelect={handleSelectOrder}
              selectedId={selectedOrderId}
            />
          </div>
          <PaginationControls
            prevPage={prevPage}
            nextPage={nextPage}
            currentPage={page}
            totalPages={totalPages}
          />
        </div>
        <div className={classes.orderPreviewWrapper}>
          {selectedOrder ? (
            <OrderPreview order={selectedOrder} />
          ) : (
            <p className="huge">Выберите заявку</p>
          )}
        </div>
      </div>
    </>
  )
}

export default Orders
