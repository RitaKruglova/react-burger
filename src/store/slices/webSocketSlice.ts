import { createSlice } from "@reduxjs/toolkit";
import { TWebSocketSliceState } from "../../utils/types";

export const webSocketSlice = createSlice({
  name: 'webSocket',
  initialState: {
    wsConnected: false,
    allOrders: [],
    error: false,
  } as TWebSocketSliceState,
  reducers: {
    wsConnectionSuccess: (state) => {
      state.wsConnected = true;
      state.error = false;
    },
    wsConnectionError: (state, action) => {
      state.wsConnected = false;
      state.error = true;
    },
    wsConnectionClosed: (state) => {
      state.wsConnected = false;
      state.error = false;
    },
    wsSetAllOrders: (state, action) => {
      state.allOrders = action.payload;
    },
  }
})

export const { wsConnectionSuccess, wsConnectionError, wsConnectionClosed, wsSetAllOrders } = webSocketSlice.actions;
export default webSocketSlice.reducer;