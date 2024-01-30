import { FC, useEffect } from 'react';
import appStyles from './app.module.css';
import Header from '../header/header';
import { Route, Routes } from 'react-router-dom';
import { fetchIngredients } from '../../store/slices/ingredientsSlice';
import { HomePage, Login, Register, ForgotPassword, ResetPassword, Profile, Feed } from '../../pages';
import ProfileForm from '../profile-form/profile-form';
import { fetchGetUser } from '../../store/slices/formSlice';
import ProtectedRoute from '../protected-route/protected-route';
import IngredientPage from '../../pages/ingredient-page';
import Preloader from '../preloader/preloader';
import { feedRoute, forgotPasswordRoute, ingredientsIdRoute, loginRoute, mainRoute, ordersRoute, profileRoute, registerRoute, resetPasswordRoute } from '../../constants/constants';
import { useAppSelector, useAppDispatch } from '../../utils/reduxHooks';

const App: FC = () => {
  const { error } = useAppSelector(store => ({
    error: store.ingredients.error
  }));
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
    if (error) {
      console.log(error);
    }
  }, [dispatch, error]);

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
            path={mainRoute}
            element={<HomePage />}
          >
            <Route path={ingredientsIdRoute} element={<IngredientPage />} />
          </Route>
          <Route
            path={feedRoute}
            element={<Feed />}
          />
          <Route
            path={loginRoute}
            element={<Login />}
          />
          <Route
            path={registerRoute}
            element={<Register />}
          />
          <Route
            path={forgotPasswordRoute}
            element={<ForgotPassword />}
          />
          <Route
            path={resetPasswordRoute}
            element={<ResetPassword />}
          />
          <Route
            path={profileRoute}
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
              path={ordersRoute}
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
