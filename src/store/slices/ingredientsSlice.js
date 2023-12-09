import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../utils/Api';
import invisibleBun from '../../images/invisible-bun.png';

const initialBun = {
  name: 'Перетащите сюда булку и другие ингредиенты',
  price: 0,
  image: invisibleBun
}

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    const response = await api.getIngredients();
    return response.data;
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
    bun: initialBun,
    currentIngredient: null
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
    },
    dropIngredient: (state, action) => {
      state.draggedIngredients.splice(state.draggedIngredients.map(i => i.uuid).indexOf(action.payload.ingredient.uuid), 1);
      state.draggedIngredients.splice(action.payload.index, 0, action.payload.ingredient);
    },
    cleanDraggedIngredients: (state) => {
      state.draggedIngredients = [];
      state.bun = initialBun;
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
export const { addIngredient, removeIngredient, addBun, setCurrentIngredient, dropIngredient, cleanDraggedIngredients } = ingredientsSlice.actions;
