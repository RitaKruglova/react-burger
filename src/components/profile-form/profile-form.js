import Form from "../form/form";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { profileEmailInput, profileNameInput, profilePasswordInput } from "../../constants/constants";

function ProfileForm() {
  return (
    <Form isProfilePlace={true}>
      <Input
        type={'text'}
        placeholder={'Имя'}
        // onChange={handleChange}
        icon={'EditIcon'}
        // value={values[profileNameInput]}
        name={profileNameInput}
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
        // value={values[profileEmailInput]}
        name={profileEmailInput}
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
        // value={values[profilePasswordInput]}
        name={profilePasswordInput}
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