import { mainRoute, profileRoute } from '../../../constants/constants';
import HeaderLogo from '../header-logo/header-logo';
import MenuItem from '../menu-item/menu-item';
import headerNavigationStyles from './header-navigation.module.css';

function HeaderNavigation() {

  return (
    <nav className={headerNavigationStyles.menu}>
      <div className={headerNavigationStyles.container}>
        <MenuItem isBurgerConstructor={true} text="Конструктор" isInContainer={true} path={mainRoute}/>
        <MenuItem isBurgerConstructor={false} text="Лента заказов" isInContainer={true} path="/order"/>
      </div>
      <HeaderLogo />
      <MenuItem isBurgerConstructor={false} text="Личный кабинет" isInContainer={false} path={profileRoute} />
    </nav>
  )
}

export default HeaderNavigation;