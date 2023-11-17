import React from 'react';
import appStyles from './app.module.css';
import Header from '../header/header';

function App() {
  return (
    <div className={appStyles.page}>
      <Header />
    </div>
  );
}

export default App;
