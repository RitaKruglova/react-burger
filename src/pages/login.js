import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Form from "../components/form/form";
import Hint from "../components/hint/hint";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordVisibility, fetchLogin, resetValues, setValue } from "../store/slices/formSlice";
import { loginEmailInput, loginPasswordInput } from "../constants/constants";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const { isPasswordVisible, values, currentUser } = useSelector(store => ({
    isPasswordVisible: store.form.isPasswordVisible,
    values: store.form.values,
    currentUser: store.form.currentUser
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

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await dispatch(fetchLogin({
        emailValue: values[loginEmailInput],
        passwordValue: values[loginPasswordInput]
      })).unwrap();
      navigate('/');
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    if ((currentUser.email && currentUser.name) || localStorage.getItem('refreshToken')) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    return () => {
      dispatch(resetValues());
    }
  }, [dispatch]);

  useEffect(() => {
    if (!values[loginEmailInput] || !values[loginPasswordInput]) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [values])

  return (
    <Form title="Вход"isProfilePlace={false} handleSubmit={handleSubmit}>
      <Input
        type={'email'}
        placeholder={'E-mail'}
        onChange={handleChange}
        value={values[loginEmailInput] || ''}
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
        value={values[loginPasswordInput] || ''}
        name={loginPasswordInput}
        error={false}
        onIconClick={changePasswordVisible}
        // errorText={''}
        size={'default'}
        extraClass="mt-6"
      />
      <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6 mb-20" disabled={isButtonDisabled}>
        Войти
      </Button>
      <Hint paragraphText="Вы — новый пользователь?" linkPath="/register" linkText="Зарегистрироваться" needIndent={true} />
      <Hint paragraphText="Забыли пароль?" linkPath="/forgot-password" linkText="Восстановить пароль" needIndent={false} />
    </Form>
  )
}

export default Login;