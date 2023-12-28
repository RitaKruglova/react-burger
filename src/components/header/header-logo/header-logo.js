import { Link } from 'react-router-dom';
import headerLogoStyles from './header-logo.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';

function HeaderLogo() {
  return (
    <div className={headerLogoStyles.container}>
      <Link to="/">
        <Logo />
      </Link>
    </div>
  )
}

export default HeaderLogo;