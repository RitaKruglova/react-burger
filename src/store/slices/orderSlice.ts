import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../utils/Api';
import { TOrderResponse, TOrderSliceState } from '../../utils/types';

export const fetchOrder = createAsyncThunk(
  'order/fetchOrder',
  async (ingredientIds: string[]) => {
    const response = await api.createOrder(ingredientIds, localStorage.getItem('accessToken'));
    return response;
  }
);

export const initialState = {
  orderNumber: null,
  order: null,
  error: null,
  currentOrder: null
} as TOrderSliceState;

const orderSlice = createSlice({
  name: 'order',
  initialState: initialState,
  reducers: {
    removeOrderNumber: (state) => {
      state.orderNumber = null;
    },
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },
    removeCurrentOrder: (state) => {
      state.currentOrder = null;
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
export const { removeOrderNumber, setCurrentOrder, removeCurrentOrder } = orderSlice.actions;