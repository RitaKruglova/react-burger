import Form from "../form/form";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

function ProfileForm() {
  return (
    <Form isProfilePlace={true}>
      <Input
        type={'text'}
        placeholder={'Имя'}
        // onChange={handleChange}
        icon={'EditIcon'}
        // value={values['register-name']}
        name={'register-name'}
        error={false}
        // onIconClick={}
        // errorText={''}
        size={'default'}
        extraClass="mt-30"
      />
      <Input
        type={'email'}
        placeholder={'E-mail'}
        // onChange={handleChange}
        icon={'EditIcon'}
        // value={values['register-email']}
        name={'register-email'}
        error={false}
        // onIconClick={}
        // errorText={''}
        size={'default'}
        extraClass="mt-6"
      />
      <Input
        type={'password'}
        placeholder={'Пароль'}
        // onChange={handleChange}
        icon={'EditIcon'}
        // value={values['register-password']}
        name={'register-password'}
        error={false}
        // onIconClick={}
        // errorText={''}
        size={'default'}
        extraClass="mt-6"
      />
    </Form>
  )
}

export default ProfileForm;