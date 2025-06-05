import { Order } from "@/types/typesEntities"
import React from "react"
import classes from "./OrderItem.module.scss"

type OrderItemProps = {
  order: Order
}

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  const shortId = order.id.slice(-4)

  return (
    <div className={classes.item}>
      <div className={classes.left}>
        <b>#{shortId}</b> / {order.order_date} / {order.email}
      </div>
      <div className={[classes.right, "_caption-bold"].join(" ")}>
        {order.status}
      </div>
    </div>
  )
}

export default OrderItem
