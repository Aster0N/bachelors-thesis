import { Order } from "@/types/typesEntities"

export const structureOrderData = (order: Order) => {
  return [
    {
      heading: `${order.first_name} ${order.last_name}`,
      rows: [
        { label: "email", data: order.email },
        { label: "запланированная дата", data: order.order_date },
      ],
    },
    {
      heading: "Клуб",
      rows: [
        { label: "название", data: order.club_name },
        { label: "адрес", data: order.club_address },
        { label: "id", data: order.club_id },
      ],
    },
    {
      heading: "Мероприятие",
      rows: [
        {
          label: "Время начала",
          data: order.start_time,
        },
        {
          label: "Время окончания",
          data: order.end_time,
        },
      ],
    },
  ]
}
