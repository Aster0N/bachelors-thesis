import HighlightedInfo from "@/components/HighlightedInfo/HighlightedInfo"
import Select from "@/components/Select/Select"
import { OrdersService } from "@/modules/Orders/OrdersService"
import { useOrderStore } from "@/modules/Orders/store/ordersStore"
import { PRIVATE_ROUTES } from "@/router/routes"
import { FlightTask } from "@/types/typesEntities"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FlightTaskService } from "../../FlightTaskService"
import classes from "./FlightTaskDetails.module.scss"
import { StructuredFlightTasks, structureFlightTaskData } from "./helpers"

type FlightTaskDetailsProps = {
  flightTaskId: FlightTask["route"]["id"]
}

const FlightTaskDetails: React.FC<FlightTaskDetailsProps> = ({
  flightTaskId,
}) => {
  const [flightTaskData, setFlightTaskData] = useState<FlightTask | null>(null)
  const [structuredFlightTaskData, setStructuredFlightTaskData] =
    useState<StructuredFlightTasks>([])
  const navigate = useNavigate()
  const { setPage } = useOrderStore()

  const fetchData = async () => {
    const flightTask = await FlightTaskService.getFlightTaskById(flightTaskId)
    if (flightTask) {
      setFlightTaskData(flightTask)
      const tasksInfo = await structureFlightTaskData(flightTask)
      setStructuredFlightTaskData(tasksInfo)
    }
  }

  const handleSelectChange = (label: string, newValue: string) => {
    if (!flightTaskData) return

    let updatedFlightTask = { ...flightTaskData }

    if (label === "видеокамера") {
      updatedFlightTask = {
        ...flightTaskData,
        camera: {
          ...flightTaskData.camera,
          model: newValue,
        },
      }
    } else if (label === "модель") {
      updatedFlightTask = {
        ...flightTaskData,
        drone: {
          ...flightTaskData.drone,
          model: newValue,
        },
      }
    }

    setFlightTaskData(updatedFlightTask)

    structureFlightTaskData(updatedFlightTask).then(setStructuredFlightTaskData)
  }

  const handleLink = async (
    type: string | undefined,
    orderId: string | undefined
  ) => {
    if (!type || !orderId) return

    const allOrders = await OrdersService.fetchAllOrders()
    const pageSize = OrdersService.pageSize

    const index = allOrders.findIndex(order => order.id === orderId)
    if (index === -1) return

    const pageIndex = Math.floor(index / pageSize)

    localStorage.setItem("selected_order_id", orderId)
    localStorage.setItem("orders_page", String(pageIndex))
    setPage(pageIndex)

    navigate(PRIVATE_ROUTES.ORDERS_PATH)
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (!flightTaskData) {
    return <big>Загрузка...</big>
  }

  const isDataChangeable = () => {
    return (
      flightTaskData.order.status == "completed" ||
      flightTaskData.order.status == "cancelled"
    )
  }

  return (
    <div
      className={[
        classes.contentWrapper,
        isDataChangeable() ? classes.lockInterface : "",
      ].join(" ")}
    >
      {isDataChangeable() && (
        <big className={classes.lockInterfaceStatus}>
          {flightTaskData.order.status}
        </big>
      )}
      {structuredFlightTaskData.map(flightTaskInfo => (
        <div
          className={[
            classes.blockInfo,
            flightTaskInfo.type == "link" ? classes.link : "",
          ].join(" ")}
          key={flightTaskInfo.heading}
          onClick={() => handleLink(flightTaskInfo.type, flightTaskInfo.linkId)}
        >
          <p className={classes.rowInfo}>
            <big className={classes.underline}>{flightTaskInfo.heading}</big>
          </p>
          {flightTaskInfo.rows.map(row => (
            <div className={classes.rowInfo} key={row.label}>
              {row.label}
              {row.isSelect ? (
                <Select
                  value={row.data}
                  options={row.options || []}
                  onChange={newValue => {
                    handleSelectChange(row.label, newValue)
                  }}
                  className={classes.blueSelect}
                />
              ) : (
                <HighlightedInfo
                  info={row.data}
                  textOverflow={row.label == "id"}
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export { FlightTaskDetails }
