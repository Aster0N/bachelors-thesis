import React from "react"
import classes from "./HighlightedInfo.module.scss"

type HighlightedInfoProps = {
  info: string
  textOverflow?: boolean
}

const HighlightedInfo: React.FC<HighlightedInfoProps> = ({
  info,
  textOverflow,
}) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(info)
    } catch (err) {
      console.error("Ошибка копирования", err)
    }
  }

  return (
    <span
      onClick={handleCopy}
      className={[classes.info, textOverflow ? classes.textOverflow : ""].join(
        " "
      )}
    >
      {info}
    </span>
  )
}

export default HighlightedInfo
