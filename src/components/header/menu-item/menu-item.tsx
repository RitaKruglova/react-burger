import menuItemStyles from './menu-item.module.css';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { mainRoute } from '../../../constants/constants';

interface IMenuItem {
  isBurgerConstructor: boolean;
  text: string;
  isInContainer: boolean;
  path: string;
}

const MenuItem: FC<IMenuItem> = ({ isBurgerConstructor, text, isInContainer, path }) => {
  const location = useLocation();

  const isLinkActive: boolean = useMemo(() => {
    if (path === mainRoute) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  }, [location.pathname, path]);

  return (
    <NavLink
      to={path}
      className={({ isActive }) => 
        `${menuItemStyles.link} ${!isInContainer ? menuItemStyles.right : ''} mr-2 pr-5 ${isActive ? menuItemStyles.active : ''}`
      }
    >
      {isBurgerConstructor && <BurgerIcon type={isLinkActive ? 'primary' : 'secondary'} />}
      {!isBurgerConstructor && isInContainer && <ListIcon type={isLinkActive ? 'primary' : 'secondary'} />}
      {!isInContainer && <ProfileIcon type={isLinkActive ? 'primary' : 'secondary'} />}
      <p className={`${menuItemStyles.name} ${isLinkActive ? menuItemStyles.white : ''} ml-2 text text_type_main-default`}>{text}</p>
    </NavLink>
  );
}

export default MenuItem;