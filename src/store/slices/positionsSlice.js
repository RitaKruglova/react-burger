import { createSlice } from "@reduxjs/toolkit";

const positionsSlice = createSlice({
  name: 'positions',
  initialState: {
    offset: {},
    listItemHeight: 1,
    top: 0
  },
  reducers: {
    setOffset: (state, action) => {
      state.offset = action.payload;
    },
    setListItemHeight: (state, action) => {
      state.listItemHeight = action.payload;
    },
    setPosition: (state, action) => {
      state.top = action.payload?.top;
    }
  }
});

export default positionsSlice.reducer;
export const { setOffset, setListItemHeight, setPosition } = positionsSlice.actions;