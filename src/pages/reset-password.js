import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Form from "../components/form/form";
import Hint from "../components/hint/hint";
import { changePasswordVisibility, fetchSetPassword, resetValues, setValue } from "../store/slices/formSlice";
import { useEffect, useState } from 'react';
import { resetPasswordPasswordInput, resetPasswordCodeInput, forgotPasswordEmailInput, loginRoute, forgotPasswordRoute } from "../constants/constants";
import { useNavigate } from "react-router-dom";
import { useProtectForms } from "../hooks/useProtectForms";
import { useAppSelector, useAppDispatch } from "../utils/reduxHooks";

function ResetPassword() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useProtectForms();

  const { isPasswordVisible, values } = useAppSelector(store => ({
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

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await dispatch(fetchSetPassword({
        newPasswordValue: values[resetPasswordPasswordInput],
        codeValue: values[resetPasswordCodeInput]
      })).unwrap();
      navigate(loginRoute);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    return () => {
      dispatch(resetValues());
    }
  }, [dispatch]);

  useEffect(() => {
    console.log(values[forgotPasswordEmailInput])
    if (!values[forgotPasswordEmailInput]) {
      navigate(forgotPasswordRoute);
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
      <Hint paragraphText="Вспомнили пароль?" linkPath={loginRoute} linkText="Войти" needIndent={false} />
    </Form>
  )
}

export default ResetPassword;