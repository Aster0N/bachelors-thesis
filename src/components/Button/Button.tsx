import { ReactNode } from "react"
import classes from "./Button.module.scss"

interface ButtonProps {
  children?: ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
}

const Button = ({ children, onClick, disabled, className }: ButtonProps) => {
  return (
    <button
      className={[classes.button, className].join(" ")}
      onClick={onClick}
      disabled={disabled}
    >
      <big>{children}</big>
    </button>
  )
}

export default Button
