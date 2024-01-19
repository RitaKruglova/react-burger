import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Form from "../components/form/form";
import Hint from "../components/hint/hint";
import { setValue, fetchResetPassword } from "../store/slices/formSlice";
import { useNavigate } from "react-router-dom";
import { forgotPasswordEmailInput, loginRoute, resetPasswordRoute } from "../constants/constants";
import { FC, useEffect, useState } from 'react';
import { useProtectForms } from "../hooks/useProtectForms";
import { useAppSelector, useAppDispatch } from "../utils/reduxHooks";

const ForgotPassword: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  useProtectForms();

  const { values } = useAppSelector(store => ({
    values: store.form.values
  }));

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setValue({
      name: event.target.name,
      value: event.target.value
    }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await dispatch(fetchResetPassword(values[forgotPasswordEmailInput])).unwrap();
      navigate(resetPasswordRoute);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!values[forgotPasswordEmailInput]) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [values])

  return (
    <Form title="Восстановление пароля" handleSubmit={handleSubmit} isProfilePlace={false}>
      <Input
        type={'email'}
        placeholder={'Укажите e-mail'}
        onChange={handleChange}
        value={values[forgotPasswordEmailInput] || ''}
        name={forgotPasswordEmailInput}
        error={false}
        // errorText={''}
        size={'default'}
        extraClass="mt-6"
      />
      <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6 mb-20" disabled={isButtonDisabled}>
        Восстановить
      </Button>
      <Hint paragraphText="Вспомнили пароль?" linkPath={loginRoute} linkText="Войти" needIndent={false} />
    </Form>
  )
}

export default ForgotPassword;