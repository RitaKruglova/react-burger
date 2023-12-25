import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Form from "../components/form/form";
import Hint from "../components/hint/hint";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordVisibility, fetchSetPassword, resetValues, setValue } from "../store/slices/formSlice";
import { useEffect, useState } from 'react';
import { resetPasswordPasswordInput, resetPasswordCodeInput, forgotPasswordEmailInput } from "../constants/constants";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
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
      await dispatch(fetchSetPassword({
        newPasswordValue: values[resetPasswordPasswordInput],
        codeValue: values[resetPasswordCodeInput]
      })).unwrap();
      navigate('/login');
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
    console.log(values[forgotPasswordEmailInput])
    if (!values[forgotPasswordEmailInput]) {
      navigate('/forgot-password');
    }
  }, [])

  useEffect(() => {
    if (!values[resetPasswordPasswordInput] || !values[resetPasswordCodeInput]) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [values])

  return (
    <Form title="Восстановление пароля" handleSubmit={handleSubmit} isProfilePlace={false}>
      <Input
        type={isPasswordVisible ? 'text' : 'password'}
        placeholder={'Введите новый пароль'}
        onChange={handleChange}
        icon={isPasswordVisible ? 'HideIcon' : 'ShowIcon'}
        value={values[resetPasswordPasswordInput] || ''}
        name={resetPasswordPasswordInput}
        error={false}
        onIconClick={changePasswordVisible}
        // errorText={''}
        size={'default'}
        extraClass="mt-6"
      />
      <Input
        type={'text'}
        placeholder={'Введите код из письма'}
        onChange={handleChange}
        value={values[resetPasswordCodeInput] || ''}
        name={resetPasswordCodeInput}
        error={false}
        // errorText={''}
        size={'default'}
        extraClass="mt-6"
      />
      <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6 mb-20" disabled={isButtonDisabled}>
        Сохранить
      </Button>
      <Hint paragraphText="Вспомнили пароль?" linkPath="/login" linkText="Войти" needIndent={false} />
    </Form>
  )
}

export default ResetPassword;