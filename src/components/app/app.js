import { useEffect } from 'react';
import appStyles from './app.module.css';
import Header from '../header/header';
import { Route, Routes } from 'react-router-dom';
import { fetchIngredients } from '../../store/slices/ingredientsSlice';
import { useDispatch, useSelector } from 'react-redux';
import HomePage from '../../pages/home-page';
import Form from '../form/form';

function App() {
  const error = useSelector(store => store.ingredients.error);
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
            element={<HomePage />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
