import { OrderStatus } from "@/types/typesEntities"
import { useState } from "react"
import classes from "./Select.module.scss"
import DropdownArrow from "/assets/img/dropdown-arrow.svg"

type Props = {
  value: OrderStatus
  onChange?: (newStatus: OrderStatus) => void
}

const statusOptions: OrderStatus[] = [
  "new",
  "in_progress",
  "completed",
  "cancelled",
]

export const Select: React.FC<Props> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (option: OrderStatus) => {
    setIsOpen(false)
    onChange?.(option)
  }

  return (
    <div className={[classes.selectWrapper, "_caption-bold"].join(" ")}>
      <div
        className={classes.selectButton}
        onClick={() => setIsOpen(prev => !prev)}
      >
        {value} <img src={DropdownArrow} alt="выбрать" />
      </div>

      {isOpen && (
        <div className={classes.optionsList}>
          {statusOptions.map(
            option =>
              option !== value && (
                <div
                  key={option}
                  className={classes.option}
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </div>
              )
          )}
        </div>
      )}
    </div>
  )
}

export default Select
