import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { bunsType } from "../../constants/constants";
import { TTabsSliceState } from "../../utils/types";

const tabsSlice = createSlice({
  name: 'tabs',
  initialState: {
    currentTab: bunsType
  } as TTabsSliceState,
  reducers: {
    setCurrentTab: (state, action: PayloadAction<string>) => {
      state.currentTab = action.payload;
    }
  }
});

export default tabsSlice.reducer;
export const { setCurrentTab } = tabsSlice.actions;