import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Form from "../components/form/form";
import Hint from "../components/hint/hint";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordVisibility } from "../store/slices/fromSlice";

function ResetPassword() {
  const dispatch = useDispatch();

  const { isPasswordVisible } = useSelector(store => ({
    isPasswordVisible: store.form.isPasswordVisible
  }));

  function changePasswordVisible() {
    dispatch(changePasswordVisibility());
  }

  return (
    <Form title="Восстановление пароля">
      <Input
        type={isPasswordVisible ? 'text' : 'password'}
        placeholder={'Введите новый пароль'}
        // onChange={}
        icon={isPasswordVisible ? 'HideIcon' : 'ShowIcon'}
        // value={}
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
        // onChange={}
        // value={}
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