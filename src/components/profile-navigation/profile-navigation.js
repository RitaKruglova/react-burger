import { NavLink } from 'react-router-dom';
import profileNavigationStyles from './profile-navigation.module.css';

function ProfileNavigation() {
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
      <button className={`${profileNavigationStyles.button} text text_type_main-medium`} type="button" >Выход</button>
      <p className={`${profileNavigationStyles.text} text text_type_main-default mt-20`}>В этом разделе вы можете изменить свои персональные данные</p>
    </div>
  )
}

export default ProfileNavigation;