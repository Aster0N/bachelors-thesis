import { ChevronDown } from "lucide-react"
import { useState } from "react"
import classes from "./Select.module.scss"

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
    <div className={[classes.selectWrapper, "_caption"].join(" ")}>
      <div
        className={[classes.selectButton, className].join(" ")}
        onClick={() => setIsOpen(prev => !prev)}
      >
        {value || placeholder} <ChevronDown />
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
