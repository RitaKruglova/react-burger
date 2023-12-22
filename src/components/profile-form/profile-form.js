import Form from "../form/form";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { profileEmailInput, profileNameInput, profilePasswordInput } from "../../constants/constants";
import profileFormStyles from './profile-form.module.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { setValue } from "../../store/slices/formSlice";

function ProfileForm() {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState({
    profileNameInput: false,
    profileEmailInput: false,
    profilePasswordInput: false
  });

  const { currentUser, values } = useSelector(store => ({
    currentUser: store.form.currentUser,
    values: store.form.values
  }));

  function handleIconClick(inputName) {
    setIsEditing(prev => ({ ...prev, [inputName]: !prev[inputName] }));
  }

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
        icon={isEditing[profileNameInput] ? 'CloseIcon' : 'EditIcon'}
        value={values[profileNameInput] || ''}
        name={profileNameInput}
        error={false}
        onIconClick={() => handleIconClick(profileNameInput)}
        // errorText={''}
        size={'default'}
        extraClass="mt-30"
        disabled={!isEditing[profileNameInput]}
      />
      <Input
        type={'email'}
        placeholder={'E-mail'}
        onChange={handleChange}
        icon={isEditing[profileEmailInput] ? 'CloseIcon' : 'EditIcon'}
        value={values[profileEmailInput] || ''}
        name={profileEmailInput}
        error={false}
        onIconClick={() => handleIconClick(profileEmailInput)}
        // errorText={''}
        size={'default'}
        extraClass="mt-6"
        disabled={!isEditing[profileEmailInput]}
      />
      <Input
        type={'password'}
        placeholder={'Пароль'}
        onChange={handleChange}
        icon={isEditing[profilePasswordInput] ? 'CloseIcon' : 'EditIcon'}
        value={values[profilePasswordInput] || '.....'}
        name={profilePasswordInput}
        error={false}
        onIconClick={() => handleIconClick(profilePasswordInput)}
        // errorText={''}
        size={'default'}
        extraClass="mt-6"
        disabled={!isEditing[profilePasswordInput]}
      />
      <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6 mb-6">
        Сохранить
      </Button>
      <button type="button" className={`${profileFormStyles.button} text text_type_main-default`}>Отмена</button>
    </Form>
  )
}

export default ProfileForm;