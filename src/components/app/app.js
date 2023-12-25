import { useEffect } from 'react';
import appStyles from './app.module.css';
import Header from '../header/header';
import { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { fetchIngredients } from '../../store/slices/ingredientsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { HomePage, Login, Register, ForgotPassword, ResetPassword, Profile } from '../../pages';
import ProfileForm from '../profile-form/profile-form';
import { fetchGetUser, fetchRefreshToken } from '../../store/slices/formSlice';
import ProtectedRoute from '../protected-route/protected-route';
import IngredientPage from '../../pages/ingredient-page';
import useNavigationHistory from '../../hooks/useNavigationHistory';

function App() {
  const { error, accessToken, currentUser } = useSelector(store => ({
    error: store.ingredients.error,
    accessToken: store.form.accessToken,
    currentUser: store.form.currentUser
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
    if (localStorage.getItem('refreshToken')) {
      dispatch(fetchRefreshToken(localStorage.getItem('refreshToken')));
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchGetUser(accessToken));
    }
  }, [accessToken]);

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
                  element={Component}
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
