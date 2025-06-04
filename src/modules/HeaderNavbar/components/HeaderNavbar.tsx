import { PRIVATE_ROUTES } from "@/router/routes"
import { NavLink } from "react-router-dom"
import classes from "./HeaderNavbar.module.scss"

const HeaderNavbar = () => {
  const links = [
    { to: PRIVATE_ROUTES.ROOT_PATH, label: "Главная" },
    { to: PRIVATE_ROUTES.AUTH_PATH, label: "Регистрация" },
    { to: PRIVATE_ROUTES.ROUTES_PATH, label: "Маршруты" },
    { to: PRIVATE_ROUTES.ORDERS_PATH, label: "Заявки" },
    { to: PRIVATE_ROUTES.PROFILE_PATH, label: "Профиль" },
  ]

  return (
    <nav className={classes.navbar}>
      <ul className={classes.navList}>
        {links.map(({ to, label }) => (
          <li key={to} className={classes.navItem}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                isActive
                  ? `${classes.navLink} ${classes.active}`
                  : classes.navLink
              }
            >
              <big>{label}</big>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default HeaderNavbar
