import burgerNavigationStyles from './burger-navigation.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTab } from '../../../store/slices/tabsSlice';
import { bunsType, saucesType, fillingsType } from '../../../constants/constants';

function BurgerNavigation() {
  const dispatch = useDispatch();
  const currentTab = useSelector(store => store.tabs.currentTab)

  function setTab(type) {
    dispatch(setCurrentTab(type))
  }

  return (
    <nav className={burgerNavigationStyles.menu}>
      <Tab value={bunsType} active={currentTab === bunsType} onClick={() => setTab(bunsType)}>
        Булки
      </Tab>
      <Tab value={saucesType} active={currentTab === saucesType} onClick={() => setTab(saucesType)}>
        Соусы
      </Tab>
      <Tab value={fillingsType} active={currentTab === fillingsType} onClick={() => setTab(fillingsType)}>
        Начинки
      </Tab>
    </nav>
  )
}

export default BurgerNavigation;