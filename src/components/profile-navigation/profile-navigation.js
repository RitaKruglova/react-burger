import { NavLink } from 'react-router-dom';
import profileNavigationStyles from './profile-navigation.module.css';

function ProfileNavigation() {
  return (
    <div className={profileNavigationStyles.container}>
      <NavLink
        to="/profile"
        className={({isActive}) => `${profileNavigationStyles.link}${isActive ? profileNavigationStyles.active : ''}`}
      >
        Профиль
      </NavLink>
      <NavLink
        to="orders"
        className={({isActive}) => `${profileNavigationStyles.link}${isActive ? profileNavigationStyles.active : ''}`}
      >
        История заказов
      </NavLink>
      <button className={profileNavigationStyles.button} type="button" >Выход</button>
      <p className={profileNavigationStyles.text}>В этом разделе вы можете изменить свои персональные данные</p>
    </div>
  )
}

export default ProfileNavigation;