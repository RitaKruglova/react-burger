import { createSlice } from "@reduxjs/toolkit";
import { TWebSocketSliceState } from "../../utils/types";

export const webSocketSlice = createSlice({
  name: 'webSocket',
  initialState: {
    wsConnected: false,
    allOrders: [],
    myOrders: [],
    total: {total: 0, totalToday: 0},
    error: false,
  } as TWebSocketSliceState,
  reducers: {
    connectionSuccess: (state) => {
      state.wsConnected = true;
      state.error = false;
    },
    connectionError: (state, action) => {
      state.wsConnected = false;
      state.error = true;
    },
    connectionClosed: (state) => {
      state.wsConnected = false;
      state.error = false;
    },
    setAllOrders: (state, action) => {
      state.allOrders = action.payload;
    },
    setMyOrders: (state, action) => {
      state.myOrders = action.payload;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    }
  }
})

export const { connectionSuccess, connectionError, connectionClosed, setAllOrders, setMyOrders } = webSocketSlice.actions;
export default webSocketSlice.reducer;