import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Form from "../components/form/form";
import Hint from "../components/hint/hint";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordVisibility, fetchLogin, resetSuccess, resetValues, setValue } from "../store/slices/formSlice";
import { loginEmailInput, loginPasswordInput } from "../constants/constants";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isPasswordVisible, values, success } = useSelector(store => ({
    isPasswordVisible: store.form.isPasswordVisible,
    values: store.form.values,
    success: store.form.success
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

  function handleSubmit(event) {
    event.preventDefault();

    dispatch(fetchLogin({
      emailValue: values[loginEmailInput],
      passwordValue: values[loginPasswordInput]
    }))
  }

  useEffect(() => {
    if (success) {
      navigate('/');
    }
  }, [success]);

  useEffect(() => {
    return () => {
      dispatch(resetValues());
      dispatch(resetSuccess());
    }
  }, [dispatch]);

  return (
    <Form title="Вход"isProfilePlace={false} handleSubmit={handleSubmit}>
      <Input
        type={'email'}
        placeholder={'E-mail'}
        onChange={handleChange}
        value={values[loginEmailInput]}
        name={loginEmailInput}
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
        value={values[loginPasswordInput]}
        name={loginPasswordInput}
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