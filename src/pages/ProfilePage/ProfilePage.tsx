import Button from "@/components/Button/Button"
import { useUserStore } from "@/modules/Auth/store/userStore"
import { useNavigate } from "react-router-dom"

const ProfilePage = () => {
  const { clearAuth } = useUserStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    clearAuth()
    localStorage.removeItem("access_token")
    navigate("/auth")
  }

  return (
    <>
      <p>
        <b>{useUserStore.getState().user?.email}</b>
      </p>
      <Button onClick={handleLogout}>Выйти</Button>
    </>
  )
}

export default ProfilePage
