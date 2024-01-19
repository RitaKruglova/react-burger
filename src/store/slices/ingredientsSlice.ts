import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../utils/Api';
import invisibleBun from '../../images/invisible-bun.png';
import { TBun, TDropIngredientAction, TIngredient, TIngredientSliceState, TInitialBun } from '../../utils/types';

const initialBun = {
  name: 'Перетащите сюда булку и другие ингредиенты',
  price: 0,
  image: invisibleBun
} as TInitialBun;

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (): Promise<any> => {
    const response = await api.getIngredients();
    return response.data;
  }
);

function increaseCountBun(state: TIngredientSliceState, action: PayloadAction<TIngredient>) {
  const ingredient = getIngredient(state, action);
  state.dataIngredients.map(i => {
    if (i.type === 'bun') {
      i.count = 0;
    }
    return i;
  })
  ingredient.count = 2;
}

function increaseCountIngredient(state: TIngredientSliceState, action: PayloadAction<TIngredient>) {
  const ingredient = getIngredient(state, action);
  if (ingredient.count) {
    ingredient.count++;
  } else {
    ingredient.count = 1;
  }
}

function decreaseCountIngredient(state: TIngredientSliceState, action: PayloadAction<TIngredient>) {
  const ingredient = getIngredient(state, action);
  if (ingredient.count) {
    ingredient.count--;
  }
}

function getIngredient(state: TIngredientSliceState, action: PayloadAction<TIngredient>) {
  return state.dataIngredients.filter(i => i._id === action.payload._id)[0];
}

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: {
    dataIngredients: [],
    error: null,
    draggedIngredients: [],
    bun: initialBun,
    currentIngredient: null
  } as TIngredientSliceState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.draggedIngredients.push(action.payload);
      increaseCountIngredient(state, action);
    },
    removeIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.draggedIngredients = state.draggedIngredients.filter(i => i.uuid !== action.payload.uuid);
      decreaseCountIngredient(state, action);
    },
    addBun: (state, action: PayloadAction<TBun>) => {
      if (action.payload._id === state.bun._id) return;
      increaseCountBun(state, action);
      state.bun = action.payload;
    },
    setCurrentIngredient: (state, action: PayloadAction<TIngredient | null>) => {
      state.currentIngredient = action.payload;
    },
    dropIngredient: (state, action: PayloadAction<TDropIngredientAction>) => {
      state.draggedIngredients.splice(state.draggedIngredients.map(i => i.uuid).indexOf(action.payload.ingredient.uuid), 1);
      state.draggedIngredients.splice(action.payload.index, 0, action.payload.ingredient);
    },
    cleanDraggedIngredients: (state) => {
      state.draggedIngredients = [];
      state.bun = initialBun;
    },
    cleanCounters: (state) => {
      state.dataIngredients.forEach(i => i.count = 0);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.fulfilled, (state, action: PayloadAction<TIngredient[]>) => {
        state.dataIngredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action: PayloadAction<string | unknown>) => {
        state.error = action.payload;
      })
  }
})

export default ingredientsSlice.reducer;
export const { addIngredient, removeIngredient, addBun, setCurrentIngredient, dropIngredient, cleanDraggedIngredients, cleanCounters } = ingredientsSlice.actions;
