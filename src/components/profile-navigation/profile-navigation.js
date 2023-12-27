import { NavLink, useNavigate } from 'react-router-dom';
import profileNavigationStyles from './profile-navigation.module.css';
import { useDispatch } from 'react-redux';
import { fetchLogout, resetCurrentUser} from '../../store/slices/formSlice';

function ProfileNavigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function logout() {
    try {
      await dispatch(fetchLogout(localStorage.getItem('refreshToken'))).unwrap();
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessToken');
      dispatch(resetCurrentUser());
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  }

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