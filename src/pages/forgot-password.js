import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Form from "../components/form/form";
import Hint from "../components/hint/hint";
import { useDispatch, useSelector } from "react-redux";
import { setValue, resetValues, fetchResetPassword, resetSuccess } from "../store/slices/fromSlice";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { values, success } = useSelector(store => ({
    values: store.form.values,
    success: store.form.success
  }));

  function handleChange(event) {
    dispatch(setValue({
      name: event.target.name,
      value: event.target.value
    }))
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(fetchResetPassword(values['forgot-password-email']));
  }

  useEffect(() => {
    return () => {
      dispatch(resetValues());
      dispatch(resetSuccess());
    }
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      navigate('/reset-password');
    }
  }, [success]);

  return (
    <Form title="Восстановление пароля" handleSubmit={handleSubmit} isProfilePlace={false}>
      <Input
        type={'email'}
        placeholder={'Укажите e-mail'}
        onChange={handleChange}
        value={values['forgot-password-email'] || ''}
        name={'forgot-password-email'}
        error={false}
        // errorText={''}
        size={'default'}
        extraClass="mt-6"
      />
      <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6 mb-20">
        Восстановить
      </Button>
      <Hint paragraphText="Вспомнили пароль?" linkPath="/login" linkText="Войти" needIndent={false} />
    </Form>
  )
}

export default ForgotPassword;