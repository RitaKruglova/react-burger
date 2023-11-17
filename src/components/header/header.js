import HeaderLogo from './header-logo/header-logo';
import headerStyles from './header.module.css';
import MenuItem from './menu-item/menu-item';

function Header() {
  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.container}>
        <nav className={headerStyles.menu}>
          <MenuItem isBurgerConstructor={true} text="Конструктор" isMenuPlace={true} />
          <MenuItem isBurgerConstructor={false} text="Лента заказов" isMenuPlace={true} />
        </nav>
        <HeaderLogo />
        <MenuItem isBurgerConstructor={false} text="Личный кабинет" isMenuPlace={false} />
      </div>
    </header>
  )
}

export default Header;