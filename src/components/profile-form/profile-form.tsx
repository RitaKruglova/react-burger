import Form from "../form/form";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { profileEmailInput, profileNameInput, profilePasswordInput, initialPassword } from "../../constants/constants";
import profileFormStyles from './profile-form.module.css';
import { useEffect, useState, useCallback, FC } from 'react';
import { fetchChangeUserInfo, fetchGetUser, setValue } from "../../store/slices/formSlice";
import { useAppSelector, useAppDispatch } from "../../utils/reduxHooks";
import { TInitialStateIsEditing } from "../../utils/types";

const ProfileForm: FC = () => {
  const dispatch = useAppDispatch();
  const initialStateIsEdititng = {
    profileNameInput: false,
    profileEmailInput: false,
    profilePasswordInput: false
  } as TInitialStateIsEditing
  const [isEditing, setIsEditing] = useState<TInitialStateIsEditing>(initialStateIsEdititng);
  const [password, setPassword] = useState<string>(initialPassword);
  const [needButtons, setNeedButtons] = useState<boolean>(false);

  const { currentUser, values} = useAppSelector(store => ({
    currentUser: store.form.currentUser,
    values: store.form.values,
  }));

  function handleIconClick(inputName: string): void {
    setIsEditing(prev => ({ ...prev, [inputName]: !prev[inputName] }));
  }

  function handleCancelClick(): void {
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
    if (!currentUser.name) {
      dispatch(fetchGetUser(localStorage.getItem('accessToken')));
    }
  }, [])

  useEffect(() => {
    const isNameChanged = values[profileNameInput] !== currentUser.name;
    const isEmailChanged = values[profileEmailInput] !== currentUser.email;
    const isPasswordChanged = isEditing[profilePasswordInput] && values[profilePasswordInput] !== initialPassword;

    if (isNameChanged || isEmailChanged || isPasswordChanged) {
      setNeedButtons(true);
    } else {
      setNeedButtons(false);
    }
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

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(setValue({ name: event.target.name, value: event.target.value }));
  }, [dispatch]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const info = {
      name: values[profileNameInput],
      email: values[profileEmailInput],
      password: isEditing[profilePasswordInput] ? values[profilePasswordInput] : undefined
    }
    const accessToken = localStorage.getItem('accessToken');
    dispatch(fetchChangeUserInfo({ info, accessToken}))
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
      {needButtons &&
        <>
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass="mt-6 mb-6"
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
        </>
      }
    </Form>
  )
}

export default ProfileForm;