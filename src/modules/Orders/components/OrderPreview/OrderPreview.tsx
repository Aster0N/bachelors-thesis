import Button from "@/components/Button/Button"
import HighlightedInfo from "@/components/HighlightedInfo/HighlightedInfo"
import Select from "@/components/Select/Select"
import { Order, OrderStatus } from "@/types/typesEntities"
import { useOrderStore } from "../../store/ordersStore"
import { structureOrderData } from "./helpers"
import classes from "./OrderPreview.module.scss"

type OrderPreviewProps = {
  order: Order
}

const OrderPreview: React.FC<OrderPreviewProps> = ({ order }) => {
  const orderData = structureOrderData(order)
  const { updateOrderStatus, getOrderStatus } = useOrderStore()
  const orderStatus = getOrderStatus(order?.id)

  const updateStatus = (newStatus: OrderStatus) => {
    updateOrderStatus(order.id, newStatus)
  }

  if (!order) {
    return <big>Ошибка получения заявки. Попробуйте позже</big>
  }

  return (
    <div className={classes.ordersPreview}>
      <div>
        <h3 className={classes.previewHeader}>Заявка #{order.id.slice(-4)}</h3>
        <hr />
        <div className={classes.previewContent}>
          {orderData.map(orderInfo => (
            <div className={classes.blockInfo} key={orderInfo.heading}>
              <p className={classes.rowInfo}>
                <big
                  className={[classes.userInfo, classes.underline].join(" ")}
                >
                  {orderInfo.heading}
                </big>
              </p>
              {orderInfo.rows.map(row => (
                <p className={classes.rowInfo} key={row.label}>
                  {row.label}{" "}
                  <HighlightedInfo
                    info={row.data}
                    textOverflow={row.label == "id"}
                  />
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div>
        <hr />
        <div className={classes.ordersPreviewControls}>
          <div>
            Статус заказа <Select value={orderStatus} onChange={updateStatus} />
          </div>
          <Button>Проложить маршрут</Button>
        </div>
      </div>
    </div>
  )
}

export default OrderPreview
