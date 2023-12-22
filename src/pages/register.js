import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Form from "../components/form/form";
import Hint from "../components/hint/hint";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordVisibility, fetchRegister, resetSuccess, resetValues, setValue } from "../store/slices/formSlice";
import { useEffect } from 'react';
import { registerNameInput, registerEmailInput, registerPasswordInput } from "../constants/constants";
import { useNavigate } from "react-router-dom";

function Register() {
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

    dispatch(fetchRegister({
      emailValue: values[registerEmailInput],
      passwordValue: values[registerPasswordInput],
      nameValue: values[registerNameInput]
    }));
  }

  useEffect(() => {
    if (success) {
      dispatch(resetSuccess());
      navigate('/login');
    }
  }, [success])

  useEffect(() => {
    return () => {
      dispatch(resetValues());
    }
  }, [dispatch]);

  return (
    <Form title="Регистрация" handleSubmit={handleSubmit} isProfilePlace={false}>
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={handleChange}
        value={values[registerNameInput]}
        name={registerNameInput}
        error={false}
        // errorText={''}
        size={'default'}
        extraClass="mt-6"
      />
      <Input
        type={'email'}
        placeholder={'E-mail'}
        onChange={handleChange}
        value={values[registerEmailInput]}
        name={registerEmailInput}
        error={false}
        // errorText={''}
        size={'default'}
        extraClass="mt-6"
      />
      <Input
        type={isPasswordVisible ? 'text' : 'password'}
        placeholder={'Пароль'}
        onChange={handleChange}
        icon={isPasswordVisible ? 'HideIcon' : 'ShowIcon'}
        value={values[registerPasswordInput]}
        name={registerPasswordInput}
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