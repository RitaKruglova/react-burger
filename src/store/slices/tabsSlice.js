import { createSlice } from "@reduxjs/toolkit";
import { bunsType } from "../../constants/constants";

const tabsSlice = createSlice({
  name: 'tabs',
  initialState: {
    currentTab: bunsType
  },
  reducers: {
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    }
  }
});

export default tabsSlice.reducer;
export const { setCurrentTab } = tabsSlice.actions;