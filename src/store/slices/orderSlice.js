import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../utils/Api';

export const fetchOrder = createAsyncThunk(
  'ingredients/fetchOrderNumber',
  async (ingredientIds, { rejectWithValue }) => {
    try {
      const response = await api.createOrder(ingredientIds);
      return response;
    } catch (error) {
      return rejectWithValue(`Произошла ошибка при создании заказа: ${error}`)
    }
  }
)

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderNumber: null,
    order: null
  },
  reducers: {
    removeOrderNumber: (state) => {
      state.orderNumber = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.orderNumber = action.payload.order.number;
        state.order = action.payload;
      })
  }
})

export default orderSlice.reducer;
export const { removeOrderNumber } = orderSlice.actions;