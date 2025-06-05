import { Order } from "@/types/typesEntities"
import React from "react"
import OrderItem from "../OrderItem/OrderItem"

type OrderListProps = {
  orderList: Order[]
}

const OrdersList: React.FC<OrderListProps> = ({ orderList }) => {
  return (
    <>
      {orderList.map(order => (
        <OrderItem key={order.id} order={order} />
      ))}
    </>
  )
}

export default OrdersList
