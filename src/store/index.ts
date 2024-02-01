import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredientsSlice';
import tabsReducer from './slices/tabsSlice';
import orderReducer from './slices/orderSlice';
import loadingReducer from './slices/loadingSlice';
import formReducer from './slices/formSlice';
import webSocketReducer from './slices/webSocketSlice';

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    tabs: tabsReducer,
    order: orderReducer,
    loading: loadingReducer,
    form: formReducer,
    webSocket: webSocketReducer
  },
})

export default store;
