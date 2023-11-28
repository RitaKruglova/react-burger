import { useEffect, useState } from 'react';
import appStyles from './app.module.css';
import Header from '../header/header';
import { Route, Routes } from 'react-router-dom';
import Burger from '../burger/burger';
import { api } from '../../utils/Api.js';
import Preloader from '../preloader/preloader';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { DataIngredientsContext } from '../../contexts/DataIngredientContext';

function App() {
  const [dataIngredients, setDataIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOrderDetailsModalOpen, setIsOrderDetailsModalOpen] = useState(false);
  const [isIngredientDetailsModalOpen, setIsIngredientDetailsModalOpen] = useState(false);

  useEffect(() => {
    api.getIngredients()
      .then(data => {
        setDataIngredients(data.data);
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }, []);

  return (
    <div className={appStyles.page}>
      <Header />
      <main className={appStyles.content}>
        <DataIngredientsContext.Provider value={{dataIngredients, setDataIngredients}}>
          <Routes>
            <Route
              path="/"
              element={!isLoading ?
                <Burger>
                  <BurgerIngredients
                    setIsIngredientDetailsModalOpen={setIsIngredientDetailsModalOpen}
                    isIngredientDetailsModalOpen={isIngredientDetailsModalOpen}
                  />
                  <BurgerConstructor
                    setIsOrderDetailsModalOpen={setIsOrderDetailsModalOpen}
                    isOrderDetailsModalOpen={isOrderDetailsModalOpen}
                  />
                </Burger>
              :
              <Preloader />}
            />
          </Routes>
        </DataIngredientsContext.Provider>
      </main>
    </div>
  );
}

export default App;
