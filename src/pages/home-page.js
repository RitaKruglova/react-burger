import Burger from '../components/burger/burger';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import Preloader from '../components/preloader/preloader';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

function HomePage() {
  const isLoading = useSelector(store => store.loading.isLoading);

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