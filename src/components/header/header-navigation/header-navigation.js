import HeaderLogo from '../header-logo/header-logo';
import MenuItem from '../menu-item/menu-item';
import headerNavigationStyles from './header-navigation.module.css';

function HeaderNavigation() {
  return (
    <nav className={headerNavigationStyles.menu}>
      <div className={headerNavigationStyles.container}>
        <MenuItem isBurgerConstructor={true} text="Конструктор" isInContainer={true} />
        <MenuItem isBurgerConstructor={false} text="Лента заказов" isInContainer={true} />
      </div>
      <HeaderLogo />
      <MenuItem isBurgerConstructor={false} text="Личный кабинет" isInContainer={false} />
    </nav>
  )
}

export default HeaderNavigation;