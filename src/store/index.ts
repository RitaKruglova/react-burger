import { configureStore, Middleware } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredientsSlice';
import tabsReducer from './slices/tabsSlice';
import orderReducer from './slices/orderSlice';
import loadingReducer from './slices/loadingSlice';
import formReducer from './slices/formSlice';
import webSocketReducer from './slices/webSocketSlice';
import { webSocketMiddleware } from '../utils/webSocketMiddleware';

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    tabs: tabsReducer,
    order: orderReducer,
    loading: loadingReducer,
    form: formReducer,
    webSocket: webSocketReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(webSocketMiddleware('wss://norma.nomoreparties.space/orders/all'))
    .concat(webSocketMiddleware('wss://norma.nomoreparties.space/orders', false))
})

export default store;
