import burgerNavigationStyles from './burger-navigation.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../../utils/reduxHooks';
import { bunsType, saucesType, fillingsType } from '../../../constants/constants';
import { FC } from 'react';
import { getCurrentTab } from '../../../utils/selectors';

interface IBurgerNavigationProps {
  handleClick: (tab: string) => void;
}

const BurgerNavigation: FC<IBurgerNavigationProps> = ({ handleClick }) => {
  const currentTab = useAppSelector(getCurrentTab);

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
