import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredientsSlice.js';
import tabsReducer from './slices/tabsSlice.js';
import orderReducer from './slices/orderSlice.js';

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    tabs: tabsReducer,
    order: orderReducer,
  },
})

export default store;
