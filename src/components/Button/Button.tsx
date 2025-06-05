import { ReactNode } from "react"
import classes from "./Button.module.scss"

interface ButtonProps {
  children?: ReactNode
  onClick?: () => void
  disabled?: boolean
}

const Button = ({ children, onClick, disabled }: ButtonProps) => {
  return (
    <button className={classes.button} onClick={onClick} disabled={disabled}>
      <big>{children}</big>
    </button>
  )
}

export default Button
