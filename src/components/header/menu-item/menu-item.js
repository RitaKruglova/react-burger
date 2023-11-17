import menuItemStyles from './menu-item.module.css';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';

function MenuItem({ isBurgerConstructor, text, isMenuPlace }) {
  return (
    <div className={`${menuItemStyles.container} mr-2 pl-5 pr-5`}>
      {isBurgerConstructor && <BurgerIcon type="primary"/>}
      {!isBurgerConstructor && isMenuPlace && <ListIcon type="secondary" />}
      {!isMenuPlace && <ProfileIcon type="secondary" />}
      <p
        className="ml-2 text text_type_main-default">{text}
      </p>
    </div>
  )
}

export default MenuItem;