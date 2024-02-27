import { createSlice } from "@reduxjs/toolkit";
import { TWebSocketSliceState } from "../../utils/types";

export const initialState = {
  wsConnected: false,
  allOrders: [],
  myOrders: [],
  total: {total: 0, totalToday: 0},
  error: false,
} as TWebSocketSliceState

export const webSocketSlice = createSlice({
  name: 'webSocket',
  initialState,
  reducers: {
    connectionSuccess: (state) => {
      state.wsConnected = true;
      state.error = false;
    },
    connectionError: (state) => {
      state.wsConnected = false;
      state.error = true;
    },
    connectionClosed: (state) => {
      state.wsConnected = false;
      state.error = false;
    },
    setAllOrders: (state, action) => {
      if (action.payload) {
        state.allOrders = action.payload;
      }
    },
    setMyOrders: (state, action) => {
      if (action.payload) {
        state.myOrders = action.payload;
      }
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    }
  }
})

export const { connectionSuccess, connectionError, connectionClosed, setAllOrders, setMyOrders, setTotal } = webSocketSlice.actions;
export default webSocketSlice.reducer;