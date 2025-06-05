import { Order } from "@/types/typesEntities"
import classes from "./OrderPreview.module.scss"

type OrderPreviewProps = {
  order: Order
}

const OrderPreview: React.FC<OrderPreviewProps> = ({ order }) => {
  return (
    <div className={classes.preview}>
      <h3>Заявка #{order.id.slice(-4)}</h3>
      <p>
        <b>Дата:</b> {order.order_date}
      </p>
      <p>
        <b>Email:</b> {order.email}
      </p>
      <p>
        <b>Имя:</b> {order.first_name} {order.last_name}
      </p>
      <p>
        <b>Статус:</b> {order.status}
      </p>
      <p>
        <b>Клуб:</b> {order.club_name}, {order.club_address}
      </p>
      <p>
        <b>Время:</b> {order.start_time}–{order.end_time}
      </p>
    </div>
  )
}

export default OrderPreview
