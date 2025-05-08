import { ReactNode } from "react"
import classes from "./Button.module.scss"

interface ButtonProps {
  children?: ReactNode
}

const Button = ({ children }: ButtonProps) => {
  return <button className={classes.button}><big>{children}</big></button>
}

export default Button
