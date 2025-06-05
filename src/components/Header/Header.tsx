import { HeaderNavbar } from "@/modules/HeaderNavbar/index"
import classes from "./Header.module.scss"

const Header = () => {
  return (
    <div className={classes.header}>
      <div className={[classes.headerBody, "_wrapper"].join(" ")}>
        <HeaderNavbar />
      </div>
    </div>
  )
}

export default Header
