import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../utils/Api';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getIngredients();
      return response.data;
    } catch (error) {
      return rejectWithValue(`Произошла ошибка загрузки ингридиентов: ${error}`);
    }
  }
);

function increaseCountBun(state, action) {
  const ingredient = getIngredient(state, action);
  state.dataIngredients.map(i => {
    if (i.type === 'bun') {
      i.count = 0;
    }
    return i;
  })
  ingredient.count = 2;
}

function increaseCountIngredient(state, action) {
  const ingredient = getIngredient(state, action);
  if (ingredient.count) {
    ingredient.count++;
  } else {
    ingredient.count = 1;
  }
}

function decreaseCountIngredient(state, action) {
  const ingredient = getIngredient(state, action);
  if (ingredient.count) {
    ingredient.count--;
  }
}

function getIngredient(state, action) {
  return state.dataIngredients.filter(i => i._id === action.payload._id)[0];
}

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
    currentIngredient: null,
    orderNumber: null,
    order: {}
  },
  reducers: {
    addIngredient: (state, action) => {
      state.draggedIngredients.push(action.payload);
      increaseCountIngredient(state, action);
    },
    removeIngredient: (state, action) => {
      state.draggedIngredients = state.draggedIngredients.filter(i => i.uuid !== action.payload.uuid);
      decreaseCountIngredient(state, action);
    },
    addBun: (state, action) => {
      if (action.payload._id === state.bun._id) return;
      increaseCountBun(state, action);
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
