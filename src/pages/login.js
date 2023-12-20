import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Form from "../components/form/form";
import Hint from "../components/hint/hint";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordVisibility } from "../store/slices/fromSlice";

function Login() {
  const dispatch = useDispatch();

  const { isPasswordVisible } = useSelector(store => ({
    isPasswordVisible: store.form.isPasswordVisible
  }));

  function changePasswordVisible() {
    dispatch(changePasswordVisibility());
  }

  return (
    <Form title="Вход">
      <Input
        type={'email'}
        placeholder={'E-mail'}
        // onChange={}
        // value={}
        name={'login-email'}
        error={false}
        // onIconClick={}
        // errorText={''}
        size={'default'}
        extraClass="mt-6"
      />
      <Input
        type={isPasswordVisible ? 'text' : 'password'}
        placeholder={'Пароль'}
        // onChange={}
        icon={isPasswordVisible ? 'HideIcon' : 'ShowIcon'}
        // value={}
        name={'login-password'}
        error={false}
        onIconClick={changePasswordVisible}
        // errorText={''}
        size={'default'}
        extraClass="mt-6"
      />
      <Button htmlType="button" type="primary" size="medium" extraClass="mt-6 mb-20">
        Войти
      </Button>
      <Hint paragraphText="Вы — новый пользователь?" linkPath="/register" linkText="Зарегистрироваться" needIndent={true} />
      <Hint paragraphText="Забыли пароль?" linkPath="/forgot-password" linkText="Восстановить пароль" needIndent={false} />
    </Form>
  )
}

export default Login;