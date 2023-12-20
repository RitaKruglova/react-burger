import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Form from "../components/form/form";
import Hint from "../components/hint/hint";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordVisibility, resetValues, setValue } from "../store/slices/fromSlice";
import { useEffect } from 'react';

function ResetPassword() {
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

  useEffect(() => {
    return () => {
      dispatch(resetValues());
    }
  }, [dispatch]);

  return (
    <Form title="Восстановление пароля">
      <Input
        type={isPasswordVisible ? 'text' : 'password'}
        placeholder={'Введите новый пароль'}
        onChange={handleChange}
        icon={isPasswordVisible ? 'HideIcon' : 'ShowIcon'}
        value={values['reset-password-password'] || ''}
        name={'reset-password-password'}
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
        value={values['reset-password-code'] || ''}
        name={'reset-password-code'}
        error={false}
        // errorText={''}
        size={'default'}
        extraClass="mt-6"
      />
      <Button htmlType="button" type="primary" size="medium" extraClass="mt-6 mb-20">
        Сохранить
      </Button>
      <Hint paragraphText="Вспомнили пароль?" linkPath="/login" linkText="Войти" needIndent={false} />
    </Form>
  )
}

export default ResetPassword;