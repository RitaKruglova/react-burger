import { NavLink, useNavigate } from 'react-router-dom';
import profileNavigationStyles from './profile-navigation.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogout, resetSuccess } from '../../store/slices/formSlice';
import { useEffect } from 'react';

function ProfileNavigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { success } = useSelector(store => ({
    success: store.form.success
  }))

  function logout() {
    dispatch(fetchLogout(localStorage.getItem('refreshToken')));
  }

  useEffect(() => {
    if (success) {
      localStorage.removeItem('refreshToken');
      navigate('/login');
      dispatch(resetSuccess());
    }
  }, [success]);

  return (
    <div className={profileNavigationStyles.container}>
      <NavLink
        to="/profile"
        end
        className={({isActive}) => `${profileNavigationStyles.link} text text_type_main-medium ${isActive ? profileNavigationStyles.active : ''}`}
      >
        Профиль
      </NavLink>
      <NavLink
        to="orders"
        className={({isActive}) => `${profileNavigationStyles.link} text text_type_main-medium ${isActive ? profileNavigationStyles.active : ''}`}
      >
        История заказов
      </NavLink>
      <button
        className={`${profileNavigationStyles.button} text text_type_main-medium`}
        type="button"
        onClick={logout}
      >
        Выход
      </button>
      <p className={`${profileNavigationStyles.text} text text_type_main-default mt-20`}>В этом разделе вы можете изменить свои персональные данные</p>
    </div>
  )
}

export default ProfileNavigation;