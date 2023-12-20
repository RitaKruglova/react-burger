import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: 'form',
  initialState: {
    isPasswordVisible: false
  },
  reducers: {
    changePasswordVisibility: (state) => {
      state.isPasswordVisible = !state.isPasswordVisible;
    }
  }
});

export default formSlice.reducer;
export const { changePasswordVisibility } = formSlice.actions;