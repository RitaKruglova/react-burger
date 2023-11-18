import React from 'react';
import appStyles from './app.module.css';
import Header from '../header/header';
import { Route, Routes } from 'react-router-dom';
import Burger from '../burger/burger';

function App() {
  return (
    <div className={appStyles.page}>
      <Header />
      <main className={appStyles.content}>
        <Routes>
          <Route path="/" element={<Burger />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
