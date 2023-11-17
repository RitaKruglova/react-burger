import HeaderNavigation from './header-navigation/header-navigation';
import headerStyles from './header.module.css';

function Header() {
  return (
    <header className={headerStyles.header}>
      <HeaderNavigation />
    </header>
  )
}

export default Header;