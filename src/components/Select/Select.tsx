import { useState } from "react"
import classes from "./Select.module.scss"
import DropdownArrow from "/assets/img/dropdown-arrow.svg"

type SelectProps<T extends string> = {
  value: T
  options: T[]
  onChange?: (newValue: T) => void
  placeholder?: string
  className?: string
}

export const Select = <T extends string>({
  value,
  options,
  onChange,
  placeholder = "Выбрать...",
  className,
}: SelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (option: T) => {
    setIsOpen(false)
    onChange?.(option)
  }

  return (
    <div className={[classes.selectWrapper, "_caption-bold"].join(" ")}>
      <div
        className={[classes.selectButton, className].join(" ")}
        onClick={() => setIsOpen(prev => !prev)}
      >
        {value || placeholder} <img src={DropdownArrow} alt="выбрать" />
      </div>

      {isOpen && (
        <div className={classes.optionsList}>
          {options.map(
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
