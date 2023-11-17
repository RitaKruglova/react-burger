import headerLogoStyles from './header-logo.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';

function HeaderLogo() {
  return (
    <div className={headerLogoStyles.container}>
      <Logo />
    </div>
  )
}

export default HeaderLogo;