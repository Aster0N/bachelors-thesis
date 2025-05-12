import { useId, useState } from "react"
import classes from "./Input.module.scss"
import EyeClosedImg from "./img/eye-off.svg"
import EyeImg from "./img/eye.svg"

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
  const [showPassword, setShowPassword] = useState(false)

  return (
    <>
      <label htmlFor={inputId} className={classes.label}>
        <span className="_small">{label}</span>
        <input
          id={inputId}
          placeholder={placeholder}
          type={
            type == "password" ? (showPassword ? "text" : "password") : type
          }
          name={name}
          className={[
            classes.input,
            className,
            type == "password" ? classes.extraPadding : "",
          ].join(" ")}
          required={required}
          onChange={onChange}
        />
        {type == "password" && (
          <button
            type="button"
            className={classes.showPassword}
            onClick={() => setShowPassword(!showPassword)}
          >
            <img
              src={showPassword ? EyeImg : EyeClosedImg}
              alt="reveal password"
            />
          </button>
        )}
      </label>
    </>
  )
}

export default Input
