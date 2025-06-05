import { Order } from "@/types/typesEntities"
import React from "react"
import classes from "./OrderItem.module.scss"

type OrderItemProps = {
  order: Order
  onClick?: () => void
  isActive?: boolean
}

const OrderItem: React.FC<OrderItemProps> = ({ order, onClick, isActive }) => {
  const shortId = order.id.slice(-4)

  return (
    <div
      className={`${classes.item} ${isActive ? classes.active : ""}`}
      onClick={onClick}
    >
      <div className={classes.left}>
        <b>#{shortId}</b> / {order.email}
      </div>
      <div className={classes.right}>
        <span className={[classes.status, "_caption-bold"].join(' ')}>{order.status}</span>
        <span className="_caption">{order.order_date}</span>
      </div>
    </div>
  )
}

export default OrderItem
