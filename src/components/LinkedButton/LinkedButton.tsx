import { ReactNode } from "react"
import classes from "./LinkedButton.module.scss"

interface LinkedButtonProps {
  children?: ReactNode
  className?: string
}
const LinkedButton = ({ children, className }: LinkedButtonProps) => {
  return (
    <button className={[classes.linkedButton, "_small", className].join(" ")}>
      {children}
    </button>
  )
}

export default LinkedButton
