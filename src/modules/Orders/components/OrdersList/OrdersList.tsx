import { Order } from "@/types/typesEntities"
import React from "react"
import OrderItem from "../OrderItem/OrderItem"

type OrderListProps = {
  orderList: Order[]
  onSelect: (id: string) => void
  selectedId: string | null
}

const OrdersList: React.FC<OrderListProps> = ({ orderList, onSelect, selectedId }) => {
  return (
    <>
      {orderList.map(order => (
        <OrderItem
          key={order.id}
          order={order}
          onClick={() => onSelect(order.id)}
          isActive={order.id === selectedId}
        />
      ))}
    </>
  )
}

export default OrdersList
