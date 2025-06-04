import Button from "@/components/Button/Button"
import { useUserStore } from "@/modules/Auth/store/userStore"

const ProfilePage = () => {
  const { clearAuth } = useUserStore()

  const handleLogout = () => {
    clearAuth()
    localStorage.removeItem("access_token")
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
