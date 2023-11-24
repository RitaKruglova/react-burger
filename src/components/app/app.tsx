import { useEffect, useState } from 'react';
import appStyles from './app.module.css';
import Header from '../header/header';
import { Route, Routes } from 'react-router-dom';
import Burger from '../burger/burger';
import { api } from '../../utils/Api.js';
import Preloader from '../preloader/preloader';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

function App() {
  const [dataIngredients, setDataIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOrderDetailsModalOpen, setIsOrderDetailsModalOpen] = useState(false);

  useEffect(() => {
    api.getIngredients()
      .then(data => {
        setDataIngredients(data.data);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className={appStyles.page}>
      <Header />
      <main className={appStyles.content}>
        <Routes>
          {/* взяла прелоадер из своего дипломного проекта с курса веб-разработки, надеюсь так можно)) это нужно чтобы в нижние компоненты не попадало начальное состояние данных */}
          <Route
            path="/"
            element={!isLoading ?
              <Burger>
                <BurgerIngredients dataIngredients={dataIngredients} />
                <BurgerConstructor
                  dataIngredients={dataIngredients}
                  setIsOrderDetailsModalOpen={setIsOrderDetailsModalOpen}
                  isOrderDetailsModalOpen={isOrderDetailsModalOpen}
                />
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
