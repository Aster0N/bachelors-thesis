import { useId } from "react"
import classes from "./Input.module.scss"

interface InputProps {
  label: string
  placeholder?: string
  type: string
}

const Input = ({ label, placeholder, type }: InputProps) => {
  const inputId = useId()

  return (
    <>
      <label htmlFor={inputId} className={classes.label}>
        <span className="_small">{label}</span>
        <input
          id={inputId}
          placeholder={placeholder}
          type={type}
          className={classes.input}
        />
      </label>
    </>
  )
}

export default Input
