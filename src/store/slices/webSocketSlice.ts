import { createSlice } from "@reduxjs/toolkit";
import { TWebSocketSliceState } from "../../utils/types";

export const webSocketSlice = createSlice({
  name: 'webSocket',
  initialState: {
    wsConnected: false,
    messages: [],
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
    wsGetMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  }
})

export const { wsConnectionSuccess, wsConnectionError, wsConnectionClosed, wsGetMessage } = webSocketSlice.actions;
export default webSocketSlice.reducer;