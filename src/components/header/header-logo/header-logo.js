import { Link } from 'react-router-dom';
import headerLogoStyles from './header-logo.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { mainRoute } from '../../../constants/constants';

function HeaderLogo() {
  return (
    <div className={headerLogoStyles.container}>
      <Link to={mainRoute}>
        <Logo />
      </Link>
    </div>
  )
}

export default HeaderLogo;