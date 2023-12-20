import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Form from "../components/form/form";
import Hint from "../components/hint/hint";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordVisibility } from "../store/slices/fromSlice";

function Register() {
  const dispatch = useDispatch();

  const { isPasswordVisible } = useSelector(store => ({
    isPasswordVisible: store.form.isPasswordVisible
  }));

  function changePasswordVisible() {
    dispatch(changePasswordVisibility());
  }

  return (
    <Form title="Регистрация">
      <Input
        type={'text'}
        placeholder={'Имя'}
        // onChange={}
        // value={}
        name={'register-name'}
        error={false}
        // onIconClick={}
        // errorText={''}
        size={'default'}
        extraClass="mt-6"
      />
      <Input
        type={'email'}
        placeholder={'E-mail'}
        // onChange={}
        // value={}
        name={'register-email'}
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
        name={'register-password'}
        error={false}
        onIconClick={changePasswordVisible}
        // errorText={''}
        size={'default'}
        extraClass="mt-6"
      />
      <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6 mb-20">
        Зарегистрироваться
      </Button>
      <Hint paragraphText="Уже зарегистрированы?" linkPath="/login" linkText="Войти" needIndent={false} />
    </Form>
  )
}

export default Register;