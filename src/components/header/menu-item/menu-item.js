import menuItemStyles from './menu-item.module.css';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

function MenuItem({ isBurgerConstructor, text, isInContainer, path }) {
  const location = useLocation();

  const [isActive, setIsActive] = useState(location.pathname === path);

  useEffect(() => {
    setIsActive(location.pathname === path);
  }, [location.pathname, path]);

  return (
    <NavLink
      to={path}
      className={`${menuItemStyles.link} ${!isInContainer ? menuItemStyles.right : ''} mr-2 pr-5`}
    >
      {isBurgerConstructor && <BurgerIcon type={isActive ? 'primary' : 'secondary'} />}
      {!isBurgerConstructor && isInContainer && <ListIcon type={isActive ? 'primary' : 'secondary'} />}
      {!isInContainer && <ProfileIcon type={isActive ? 'primary' : 'secondary'} />}
      <p
        className={`${menuItemStyles.name} ${isActive ? menuItemStyles.white : ''} ml-2 text text_type_main-default`}>{text}
      </p>
    </NavLink>
  )
}

MenuItem.propTypes = {
  isBurgerConstructor: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  isInContainer: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired
}

export default MenuItem;