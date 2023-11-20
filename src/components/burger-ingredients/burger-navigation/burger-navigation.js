import { useState } from 'react';
import burgerNavigationStyles from './burger-navigation.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerNavigation() {
  const [current, setCurrent] = useState('булки');

  return (
    <nav className={burgerNavigationStyles.menu}>
      <Tab value="булки" active={current === "булки"} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="соусы" active={current === "соусы"} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="начинки" active={current === "начинки"} onClick={setCurrent}>
        Начинки
      </Tab>
    </nav>
  )
}

export default BurgerNavigation;