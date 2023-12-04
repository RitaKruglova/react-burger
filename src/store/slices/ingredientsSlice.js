import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../utils/Api';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getIngredients();
      return response.data;
    } catch (error) {
      return rejectWithValue('Произошла ошибка загрузки ингридиентов');
    }
  }
)

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: {
    data: [],
    isLoading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  }
})

export default ingredientsSlice.reducer;
