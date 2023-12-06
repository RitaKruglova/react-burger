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
    dataIngredients: [],
    isLoading: false,
    error: null,
    draggedIngredients: [],
    draggedIngredient: {},
    bun: {
      name: 'Перетащите сюда булку',
      price: 0,
      image: "https://code.s3.yandex.net/react/code/bun-02.png",
    },
    currentIngredient: {}
  },
  reducers: {
    addIngredient: (state, action) => {
      state.draggedIngredients.push(action.payload);
    },
    removeIngredient: (state, action) => {
      state.draggedIngredients = state.draggedIngredients.filter(i => i.id !== action.payload._id);
    },
    addBun: (state, action) => {
      state.bun = action.payload;
    },
    setCurrentIngredient: (state, action) => {
      state.currentIngredient = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.dataIngredients = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  }
})

export default ingredientsSlice.reducer;
export const { addIngredient, removeIngredient, addBun, setCurrentIngredient } = ingredientsSlice.actions;
