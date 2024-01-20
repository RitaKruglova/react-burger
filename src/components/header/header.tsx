import { FC } from 'react';
import HeaderNavigation from './header-navigation/header-navigation';
import headerStyles from './header.module.css';

const Header: FC = () => {
  return (
    <header className={headerStyles.header}>
      <HeaderNavigation />
    </header>
  )
}

export default Header;