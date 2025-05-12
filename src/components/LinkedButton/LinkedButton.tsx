import { ReactNode } from "react"
import classes from "./LinkedButton.module.scss"

interface LinkedButtonProps {
  children?: ReactNode
  className?: string
  onClick?: () => void
}
const LinkedButton = ({ children, className, onClick }: LinkedButtonProps) => {
  return (
    <button
      className={[classes.linkedButton, "_small", className].join(" ")}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default LinkedButton
