import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Form from "../../components/form/form";
import { useState } from 'react';

function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function changePasswordVisible() {
    setIsPasswordVisible(!isPasswordVisible);
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
        type={'password'}
        placeholder={'Пароль'}
        // onChange={}
        icon={isPasswordVisible ? 'HideIcon' : 'ShowIcon'}
        // value={}
        name={'login-email'}
        error={false}
        onIconClick={changePasswordVisible}
        // errorText={''}
        size={'default'}
        extraClass="mt-6"
      />
      <Button htmlType="button" type="primary" size="medium" extraClass="mt-6 mb-20">
        Войти
      </Button>
    </Form>
  )
}

export default Login;