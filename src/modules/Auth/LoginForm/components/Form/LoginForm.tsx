import Button from "@/components/Button/Button"
import Input from "@/components/Input/Input"
import classes from "./LoginForm.module.scss"

const LoginForm = () => {
  return (
    <form className={classes.form}>
      <Input label="email" type="email" />
      <Input label="пароль" type="password" />
      <Button>войти</Button>
    </form>
  )
}

export { LoginForm }
