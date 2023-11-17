import React from 'react';
import appStyles from './app.module.css';
import Header from '../header/header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

function App() {
  return (
    <div className={appStyles.page}>
      <Header />
      <main className={appStyles.content}>
        <BurgerIngredients />
      </main>
    </div>
  );
}

export default App;
