import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Form from "../components/form/form";
import Hint from "../components/hint/hint";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordVisibility, setValue } from "../store/slices/fromSlice";

function Login() {
  const dispatch = useDispatch();

  const { isPasswordVisible, values } = useSelector(store => ({
    isPasswordVisible: store.form.isPasswordVisible,
    values: store.form.values
  }));

  function changePasswordVisible() {
    dispatch(changePasswordVisibility());
  }

  function handleChange(event) {
    dispatch(setValue({
      name: event.target.name,
      value: event.target.value
    }))
  }

  return (
    <Form title="Вход"isProfilePlace={false}>
      <Input
        type={'email'}
        placeholder={'E-mail'}
        onChange={handleChange}
        value={values['login-email']}
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
        onChange={handleChange}
        icon={isPasswordVisible ? 'HideIcon' : 'ShowIcon'}
        value={values['login-password']}
        name={'login-password'}
        error={false}
        onIconClick={changePasswordVisible}
        // errorText={''}
        size={'default'}
        extraClass="mt-6"
      />
      <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6 mb-20">
        Войти
      </Button>
      <Hint paragraphText="Вы — новый пользователь?" linkPath="/register" linkText="Зарегистрироваться" needIndent={true} />
      <Hint paragraphText="Забыли пароль?" linkPath="/forgot-password" linkText="Восстановить пароль" needIndent={false} />
    </Form>
  )
}

export default Login;