import { createSlice } from "@reduxjs/toolkit";
import { TWebSocketSliceState } from "../../utils/types";

export const webSocketSlice = createSlice({
  name: 'webSocket',
  initialState: {
    wsConnected: false,
    orders: [],
    error: null,
  } as TWebSocketSliceState,
  reducers: {
    wsConnectionSuccess: (state) => {
      state.wsConnected = true;
    },
    wsConnectionError: (state, action) => {
      state.wsConnected = false;
      state.error = action.payload;
    },
    wsConnectionClosed: (state) => {
      state.wsConnected = false;
    },
    wsSetAllOrders: (state, action) => {
      state.orders = action.payload;
    },
  }
})

export const { wsConnectionSuccess, wsConnectionError, wsConnectionClosed, wsSetAllOrders } = webSocketSlice.actions;
export default webSocketSlice.reducer;