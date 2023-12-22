import Form from "../form/form";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { profileEmailInput, profileNameInput, profilePasswordInput } from "../../constants/constants";
import profileFormStyles from './profile-form.module.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { setValue } from "../../store/slices/formSlice";

function ProfileForm() {
  const dispatch = useDispatch();

  const { currentUser, values } = useSelector(store => ({
    currentUser: store.form.currentUser,
    values: store.form.values
  }));
  

  useEffect(() => {
    dispatch(setValue({
      name: profileEmailInput,
      value: currentUser.email
    }));
    dispatch(setValue({
      name: profileNameInput,
      value: currentUser.name
    }));
  }, [currentUser, dispatch]);

  function handleChange(event) {
    dispatch(setValue({
      name: event.target.name,
      value: event.target.value
    }));
  }

  return (
    <Form isProfilePlace={true}>
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={handleChange}
        icon={'EditIcon'}
        value={values[profileNameInput] || ''}
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
        onChange={handleChange}
        icon={'EditIcon'}
        value={values[profileEmailInput] || ''}
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
        onChange={handleChange}
        icon={'EditIcon'}
        value={values[profilePasswordInput] || ''}
        name={profilePasswordInput}
        error={false}
        // onIconClick={}
        // errorText={''}
        size={'default'}
        extraClass="mt-6"
      />
      <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6 mb-6">
        Сохранить
      </Button>
      <button type="button" className={`${profileFormStyles.button} text text_type_main-default`}>Отмена</button>
    </Form>
  )
}

export default ProfileForm;