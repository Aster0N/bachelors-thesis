import { useEffect, useState } from "react"
import { useOrderStore } from "../../store/ordersStore"
import OrderPreview from "../OrderPreview/OrderPreview"
import OrdersList from "../OrdersList/OrdersList"
import PaginationControls from "../PaginationControls/PaginationControls"
import classes from "./Orders.module.scss"

const Orders = () => {
  const { pageOrders, total, page, pageSize, fetchOrders, setPage } =
    useOrderStore()
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(() =>
    localStorage.getItem("selected_order_id")
  )

  const selectedOrder =
    pageOrders.find(order => order.id === selectedOrderId) || pageOrders[0]

  const nextPage = () => {
    const totalPages = Math.ceil(total / pageSize)
    setPage(Math.min(page + 1, totalPages - 1))
  }

  const prevPage = () => {
    setPage(Math.max(page - 1, 0))
  }

  const handleSelectOrder = (id: string) => {
    setSelectedOrderId(id)
    localStorage.setItem("selected_order_id", id)
  }

  useEffect(() => {
    handleSelectOrder(selectedOrder?.id)
  }, [selectedOrder])

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <>
      <p className="_caption">всего: {total}</p>
      <div className={classes.ordersModule}>
        <div className={classes.ordersList}>
          <div>
            <OrdersList
              orderList={pageOrders}
              onSelect={handleSelectOrder}
              selectedId={selectedOrderId}
            />
          </div>
          <PaginationControls
            prevPage={prevPage}
            nextPage={nextPage}
            currentPage={page}
            totalPages={Math.ceil(total / pageSize)}
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
