import menuItemStyles from './menu-item.module.css';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

function MenuItem({ isBurgerConstructor, text, isInContainer, path }) {
  const location = useLocation();

  const isLinkActive = useMemo(() => {
    if (path === '/') {
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

MenuItem.propTypes = {
  isBurgerConstructor: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  isInContainer: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired
};

export default MenuItem;