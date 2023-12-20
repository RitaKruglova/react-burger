import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Form from "../components/form/form";
import Hint from "../components/hint/hint";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordVisibility, fetchRegister, resetValues, setValue } from "../store/slices/fromSlice";
import { useEffect } from 'react';

function Register() {
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

  function handleSubmit(event) {
    event.preventDefault();
    
    dispatch(fetchRegister({
      emailValue: values['register-email'],
      passwordValue: values['register-password'],
      nameValue: values['register-name']
    }));
  }

  useEffect(() => {
    return () => {
      dispatch(resetValues);
    }
  }, [dispatch]);

  return (
    <Form title="Регистрация" handleSubmit={handleSubmit} isProfilePlace={false}>
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={handleChange}
        value={values['register-name']}
        name={'register-name'}
        error={false}
        // errorText={''}
        size={'default'}
        extraClass="mt-6"
      />
      <Input
        type={'email'}
        placeholder={'E-mail'}
        onChange={handleChange}
        value={values['register-email']}
        name={'register-email'}
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
        value={values['register-password']}
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