import { useEffect } from 'react';
import appStyles from './app.module.css';
import Header from '../header/header';
import { Route, Routes } from 'react-router-dom';
import { fetchIngredients } from '../../store/slices/ingredientsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { HomePage, Login, Register, ForgotPassword, ResetPassword, Profile } from '../../pages';
import ProfileForm from '../profile-form/profile-form';
import { fetchGetUser } from '../../store/slices/formSlice';
import ProtectedRoute from '../protected-route/protected-route';
import IngredientPage from '../../pages/ingredient-page';
import useNavigationHistory from '../../hooks/useNavigationHistory';
import Preloader from '../preloader/preloader';

function App() {
  const { error } = useSelector(store => ({
    error: store.ingredients.error
  }));
  const dispatch = useDispatch();

  const { previousPath } = useNavigationHistory();

  useEffect(() => {
    dispatch(fetchIngredients());
    if (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      dispatch(fetchGetUser(accessToken));
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
          >
            <Route path="ingredients/:id" element={<IngredientPage previousPath={previousPath} />} />
          </Route>
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />
          <Route
            path="/reset-password"
            element={<ResetPassword />}
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                element={Profile}
              />
            }
          >
            <Route
              path=""
              element={
                <ProtectedRoute
                  element={ProfileForm}
                />
              }
            />
            <Route
              path="orders"
              element={
                <ProtectedRoute
                  element={Preloader} // временно положила сюда прелоадер
                />
              }
            />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
