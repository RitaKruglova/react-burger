import burgerNavigationStyles from './burger-navigation.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { bunsType, saucesType, fillingsType } from '../../../constants/constants';

function BurgerNavigation({ handleClick }) {
  const currentTab = useSelector(store => store.tabs.currentTab);

  return (
    <nav className={burgerNavigationStyles.menu}>
      <Tab value={bunsType} active={currentTab === bunsType} onClick={() => handleClick(bunsType)}>
        Булки
      </Tab>
      <Tab value={saucesType} active={currentTab === saucesType} onClick={() => handleClick(saucesType)}>
        Соусы
      </Tab>
      <Tab value={fillingsType} active={currentTab === fillingsType} onClick={() => handleClick(fillingsType)}>
        Начинки
      </Tab>
    </nav>
  )
}

export default BurgerNavigation;
