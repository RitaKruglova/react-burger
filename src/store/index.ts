import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredientsSlice.js';
import tabsReducer from './slices/tabsSlice.js';
import orderReducer from './slices/orderSlice.js';
import loadingReducer from './slices/loadingSlice.js';
import formReducer from './slices/fromSlice.js';

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
