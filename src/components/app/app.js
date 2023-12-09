import { useEffect } from 'react';
import appStyles from './app.module.css';
import Header from '../header/header';
import { Route, Routes } from 'react-router-dom';
import Burger from '../burger/burger';
import Preloader from '../preloader/preloader';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { fetchIngredients } from '../../store/slices/ingredientsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Уважаемый господин Ревьюер, подскажите пожалуйста как мне исправить warning из консоли и где эта ошибка вообще находится, я не поняла(((. Заранее спасибо

function App() {
  const { isLoading, error } = useSelector(store => ({
    isLoading: store.loading.isLoading,
    error: store.ingredients.error
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
    if (error) {
      console.log(error);
    }
  }, [dispatch]);

  return (
    <div className={appStyles.page}>
      <Header />
      <main className={appStyles.content}>
        <Routes>
          <Route
            path="/"
            element={!isLoading ?
              <Burger>
                <DndProvider backend={HTML5Backend}>
                  <BurgerIngredients />
                  <BurgerConstructor />
                </DndProvider>
              </Burger>
            :
            <Preloader />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
