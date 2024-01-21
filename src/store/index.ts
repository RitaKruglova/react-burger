import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredientsSlice';
import tabsReducer from './slices/tabsSlice';
import orderReducer from './slices/orderSlice';
import loadingReducer from './slices/loadingSlice';
import formReducer from './slices/formSlice';

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    tabs: tabsReducer,
    order: orderReducer,
    loading: loadingReducer,
    form: formReducer
  },
})

export default store;
