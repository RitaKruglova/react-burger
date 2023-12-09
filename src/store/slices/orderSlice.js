import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../utils/Api';

export const fetchOrder = createAsyncThunk(
  'ingredients/fetchOrderNumber',
  async (ingredientIds) => {
    const response = await api.createOrder(ingredientIds);
    return response;
  }
)

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderNumber: null,
    order: null,
    error: null
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
      .addCase(fetchOrder.rejected, (state, action) => {
        state.error = action.payload;
      })
  }
})

export default orderSlice.reducer;
export const { removeOrderNumber } = orderSlice.actions;