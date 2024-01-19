import { createSlice } from "@reduxjs/toolkit";
import { fetchIngredients } from "./ingredientsSlice";
import { fetchOrder } from "./orderSlice";
import { TLoadingSliceState } from "../../utils/types";

const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    isLoading: false
  } as TLoadingSliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIngredients.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrder.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchOrder.rejected, (state) => {
        state.isLoading = false;
      })
  }
});

export default loadingSlice.reducer;