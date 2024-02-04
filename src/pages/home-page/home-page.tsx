import Burger from '../../components/burger/burger';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import Preloader from '../../components/preloader/preloader';
import { useAppSelector } from '../../utils/reduxHooks'; 
import { Outlet } from 'react-router-dom';
import { FC } from 'react';

const HomePage: FC = () => {
  const isLoading = useAppSelector(store => store.loading.isLoading);

  return (
    <>
      {!isLoading ?
        <>
          <Burger>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </Burger>
          <Outlet />
        </>
      :
      <Preloader />}
    </>
  )
}

export default HomePage;