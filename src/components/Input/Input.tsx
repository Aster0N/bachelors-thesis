import { useId } from "react"
import classes from "./Input.module.scss"

interface InputProps {
  label: string
  placeholder?: string
  type: string
  name?: string
  required?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string | string[]
}

const Input = ({
  label,
  placeholder,
  type,
  name = label,
  required = true,
  onChange,
  className,
}: InputProps) => {
  const inputId = useId()

  return (
    <>
      <label htmlFor={inputId} className={classes.label}>
        <span className="_small">{label}</span>
        <input
          id={inputId}
          placeholder={placeholder}
          type={type}
          name={name}
          className={[classes.input, className].join(" ")}
          required={required}
          onChange={onChange}
        />
      </label>
    </>
  )
}

export default Input
