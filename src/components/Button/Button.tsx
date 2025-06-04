import { ReactNode } from "react"
import classes from "./Button.module.scss"

interface ButtonProps {
  children?: ReactNode
  onClick?: () => void
}

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button className={classes.button} onClick={onClick}>
      <big>{children}</big>
    </button>
  )
}

export default Button
