import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredientsSlice.js';
import tabsReducer from './slices/tabsSlice.js';
import orderReducer from './slices/orderSlice.js';
import loadingReducer from './slices/loadingSlice.js';

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    tabs: tabsReducer,
    order: orderReducer,
    loading: loadingReducer
  },
})

export default store;
