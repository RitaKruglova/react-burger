import Form from "../form/form";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { profileEmailInput, profileNameInput, profilePasswordInput, initialPassword } from "../../constants/constants";
import profileFormStyles from './profile-form.module.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useCallback } from 'react';
import { fetchChangeUserInfo, setValue } from "../../store/slices/formSlice";

function ProfileForm() {
  const dispatch = useDispatch();
  const initialStateIsEdititng = {
    profileNameInput: false,
    profileEmailInput: false,
    profilePasswordInput: false
  }
  const [isEditing, setIsEditing] = useState(initialStateIsEdititng);
  const [password, setPassword] = useState(initialPassword);
  const [disabledButton, setDisabledButton] = useState(true);

  const { currentUser, values, accessToken } = useSelector(store => ({
    currentUser: store.form.currentUser,
    values: store.form.values,
    accessToken: store.form.accessToken
  }));

  function handleIconClick(inputName) {
    setIsEditing(prev => ({ ...prev, [inputName]: !prev[inputName] }));
  }

  function handleCancelClick() {
    dispatch(setValue({
      name: profileNameInput,
      value: currentUser.name
    }));
    dispatch(setValue({
      name: profileEmailInput,
      value: currentUser.email
    }));
    setPassword(initialPassword);
    setIsEditing({
      profileNameInput: false,
      profileEmailInput: false,
      profilePasswordInput: false
    })
  }

  useEffect(() => {
    const isNameChanged = values[profileNameInput] !== currentUser.name;
    const isEmailChanged = values[profileEmailInput] !== currentUser.email;
    const isPasswordChanged = isEditing[profilePasswordInput] && values[profilePasswordInput] !== initialPassword;
  
    setDisabledButton(!(isNameChanged || isEmailChanged || isPasswordChanged));
  }, [values, currentUser, isEditing]);

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

  useEffect(() => {
    if (!isEditing.profileNameInput) {
      dispatch(setValue({
        name: profileNameInput,
        value: currentUser.name
      }));
    }
    if (!isEditing.profileEmailInput) {
      dispatch(setValue({
        name: profileEmailInput,
        value: currentUser.email
      }));
    }
    if (!isEditing.profilePasswordInput) {
      dispatch(setValue({
        name: profilePasswordInput,
        value: ''
      }));
    }
  }, [isEditing, dispatch, currentUser])

  const handleChange = useCallback((event) => {
    dispatch(setValue({ name: event.target.name, value: event.target.value }));
  }, [dispatch]);

  function handleSubmit(event) {
    event.preventDefault();

    const info = {
      name: values[profileNameInput],
      email: values[profileEmailInput],
      password: isEditing[profilePasswordInput] ? values[profilePasswordInput] : undefined
    }
    dispatch(fetchChangeUserInfo({ info, accessToken }))
    setIsEditing(initialStateIsEdititng)
  }

  return (
    <Form isProfilePlace={true} handleSubmit={handleSubmit}>
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
        value={isEditing[profilePasswordInput] ? values[profilePasswordInput] : password}
        name={profilePasswordInput}
        error={false}
        onIconClick={() => handleIconClick(profilePasswordInput)}
        // errorText={''}
        size={'default'}
        extraClass="mt-6"
        disabled={!isEditing[profilePasswordInput]}
      />
      <Button
        htmlType="submit"
        type="primary"
        size="medium"
        extraClass="mt-6 mb-6"
        disabled={disabledButton}
      >
        Сохранить
      </Button>
      <button
        type="button"
        className={`${profileFormStyles.button} text text_type_main-default`}
        onClick={handleCancelClick}
      >
        Отмена
      </button>
    </Form>
  )
}

export default ProfileForm;