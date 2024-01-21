import { NavLink, useNavigate } from 'react-router-dom';
import profileNavigationStyles from './profile-navigation.module.css';
import { useAppDispatch } from '../../utils/reduxHooks'; 
import { fetchLogout, resetCurrentUser} from '../../store/slices/formSlice';
import { loginRoute, ordersRoute, profileRoute } from '../../constants/constants';
import { FC } from 'react';

const ProfileNavigation: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  async function logout(): Promise<void> {
    try {
      await dispatch(fetchLogout(localStorage.getItem('refreshToken'))).unwrap();
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessToken');
      dispatch(resetCurrentUser());
      navigate(loginRoute);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={profileNavigationStyles.container}>
      <NavLink
        to={profileRoute}
        end
        className={({isActive}) => `${profileNavigationStyles.link} text text_type_main-medium ${isActive ? profileNavigationStyles.active : ''}`}
      >
        Профиль
      </NavLink>
      <NavLink
        to={ordersRoute}
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