import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Form from "../components/form/form";
import Hint from "../components/hint/hint";

function ForgotPassword() {
  return (
    <Form title="Восстановление пароля">
      <Input
        type={'email'}
        placeholder={'Укажите e-mail'}
        // onChange={}
        // value={}
        name={'forgot-password-email'}
        error={false}
        // onIconClick={}
        // errorText={''}
        size={'default'}
        extraClass="mt-6"
      />
      <Button htmlType="button" type="primary" size="medium" extraClass="mt-6 mb-20">
        Восстановить
      </Button>
      <Hint paragraphText="Вспомнили пароль?" linkPath="/login" linkText="Войти" needIndent={false} />
    </Form>
  )
}

export default ForgotPassword;