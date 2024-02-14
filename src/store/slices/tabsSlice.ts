import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { bunsType } from "../../constants/constants";
import { TTabsSliceState } from "../../utils/types";

export const initialState = {
  currentTab: bunsType
} as TTabsSliceState

const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    setCurrentTab: (state, action: PayloadAction<string>) => {
      state.currentTab = action.payload;
    }
  }
});

export default tabsSlice.reducer;
export const { setCurrentTab } = tabsSlice.actions;