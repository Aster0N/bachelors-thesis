import HighlightedInfo from "@/components/HighlightedInfo/HighlightedInfo"
import Select from "@/components/Select/Select"
import { FlightTask } from "@/types/typesEntities"
import { useEffect, useState } from "react"
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

  useEffect(() => {
    fetchData()
  }, [])

  if (!flightTaskData) {
    return <big>Загрузка...</big>
  }

  return (
    <div className={classes.wrapper}>
      <h3># {flightTaskData.id}</h3>
      <span>{flightTaskData.order.club_name}</span>
      <div className={classes.contentWrapper}>
        {structuredFlightTaskData.map(flightTaskInfo => (
          <div className={classes.blockInfo} key={flightTaskInfo.heading}>
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
    </div>
  )
}

export default FlightTaskDetails
