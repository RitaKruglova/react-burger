import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../utils/Api';
import { TOrderResponse, TOrderSliceState } from '../../utils/types';

export const fetchOrder = createAsyncThunk(
  'ingredients/fetchOrderNumber',
  async (ingredientIds: string[]) => {
    const response = await api.createOrder(ingredientIds);
    return response;
  }
)

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderNumber: null,
    order: null,
    error: null,
  } as TOrderSliceState,
  reducers: {
    removeOrderNumber: (state) => {
      state.orderNumber = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.fulfilled, (state, action: PayloadAction<TOrderResponse>) => {
        state.orderNumber = action.payload.order.number;
        state.order = action.payload;
      })
      .addCase(fetchOrder.rejected, (state, action: PayloadAction<string | unknown>) => {
        state.error = action.payload;
      })
  }
})

export default orderSlice.reducer;
export const { removeOrderNumber } = orderSlice.actions;