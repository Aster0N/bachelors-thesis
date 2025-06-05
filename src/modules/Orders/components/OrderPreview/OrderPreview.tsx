import Button from "@/components/Button/Button"
import HighlightedInfo from "@/components/HighlightedInfo/HighlightedInfo"
import { Order } from "@/types/typesEntities"
import classes from "./OrderPreview.module.scss"
import { structureOrderData } from "./helpers"

type OrderPreviewProps = {
  order: Order
}

const OrderPreview: React.FC<OrderPreviewProps> = ({ order }) => {
  if (!order) {
    return <big>Ошибка получения заявки. Попробуйте позже</big>
  }

  const orderData = structureOrderData(order)

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
        <p>Статус заказа {order.status}</p>
        <Button>Проложить маршрут</Button>
      </div>
    </div>
  )
}

export default OrderPreview

/*
<div>
            <p className={classes.rowInfo}>
              <big className={classes.underline}>Клуб</big>
            </p>
            <p className={classes.rowInfo}>
              название <HighlightedInfo info={order.club_name} />
            </p>
            <p className={classes.rowInfo}>
              адрес <HighlightedInfo info={order.club_address} />
            </p>
            <p className={classes.rowInfo}>
              id <HighlightedInfo info={order.club_id} textOverflow={true} />
            </p>
          </div>
          <div>
            <p className={classes.rowInfo}>
              <big className={classes.underline}>Мероприятие</big>
            </p>
            <p className={classes.rowInfo}>
              Временной промежуток <HighlightedInfo info={order.start_time} />-
              <HighlightedInfo info={order.end_time} />
            </p>
          </div>*/
