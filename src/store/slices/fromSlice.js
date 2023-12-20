import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../utils/Api";

export const fetchResetPassword = createAsyncThunk(
  'form/fetchResetPassword',
  async (emailValue) => {
    const response = await api.resetPassword(emailValue);
    return response;
  }
)

const formSlice = createSlice({
  name: 'form',
  initialState: {
    isPasswordVisible: false,
    values: {},
    success: false
  },
  reducers: {
    changePasswordVisibility: (state) => {
      state.isPasswordVisible = !state.isPasswordVisible;
    },
    setValue: (state, action) => {
      state.values[action.payload.name] = action.payload.value;
    },
    resetValues: (state) => {
      state.values = {}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResetPassword.fulfilled, (state, action) => {
        state.success = action.payload.success;
      })
      .addCase(fetchResetPassword.rejected, (state) => {
        state.success = false;
      })
  }
});

export default formSlice.reducer;
export const { changePasswordVisibility, setValue, resetValues } = formSlice.actions;