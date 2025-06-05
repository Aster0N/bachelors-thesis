import { FlightTaskPreview } from "@/modules/FlightTasks/types"
import React from "react"
import classes from "./FlightTaskCard.module.scss"

const FlightTaskCard: React.FC<FlightTaskPreview> = ({ id, status, date, onClick }) => {
  return (
    <div className={classes.card} onClick={onClick}>
      <div className={classes.top}>
        <span className="_large">
          <b>Маршрут #{id.split("-").at(-1)}</b>
        </span>
        <span>{date}</span>
      </div>
      {status && (
        <div className={classes.bottom}>
          <span>{status}</span>
        </div>
      )}
    </div>
  )
}

export default FlightTaskCard
