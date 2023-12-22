import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../utils/Api";

function saveTokens(state, action) {
  state.accessToken = action.payload.accessToken.split(' ')[1];
  localStorage.setItem('refreshToken', action.payload.refreshToken);
}

export const fetchResetPassword = createAsyncThunk(
  'form/fetchResetPassword',
  async (emailValue) => {
    const response = await api.resetPassword(emailValue);
    return response;
  }
);

export const fetchSetPassword = createAsyncThunk(
  'form/fetchSetPassword',
  async ({ newPasswordValue, codeValue }) => {
    const response = await api.setPassword(newPasswordValue, codeValue);
    return response;
  }
)

export const fetchRegister = createAsyncThunk(
  'form/fetchRegister',
  async ({ emailValue, passwordValue, nameValue }) => {
    const response = await api.register(emailValue, passwordValue, nameValue);
    return response;
  }
)

export const fetchLogin = createAsyncThunk(
  'form/fetchLogin',
  async ({ emailValue, passwordValue }) => {
    const response = await api.login(emailValue, passwordValue);
    return response;
  }
)

export const fetchRefreshToken = createAsyncThunk(
  'form/fetchRefreshToken',
  async (token) => {
    const response = await api.refreshToken(token);
    return response;
  }
)

export const fetchLogout = createAsyncThunk(
  'form/fetchLogout',
  async (token) => {
    const response = await api.logout(token);
    return response;
  }
)

const formSlice = createSlice({
  name: 'form',
  initialState: {
    isPasswordVisible: false,
    values: {},
    success: false,
    currentUser: {
      email: '',
      name: ''
    },
    accessToken: ''
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
    },
    resetSuccess: (state) => {
      state.success = false
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
      .addCase(fetchSetPassword.fulfilled, (state, action) => {
        state.success = action.payload.success;
      })
      .addCase(fetchSetPassword.rejected, (state) => {
        state.success = false;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        saveTokens(state, action);
        state.success = action.payload.success;
        state.currentUser = action.payload.user;
      })
      .addCase(fetchLogin.rejected, (state) => {
        state.success = false;
      })
      .addCase(fetchRefreshToken.fulfilled, (state, action) => {
        saveTokens(state, action);
        state.success = action.payload.success;
      })
      .addCase(fetchRefreshToken.rejected, (state) => {
        state.success = false;
      })
      .addCase(fetchLogout.fulfilled, (state, action) => {
        state.success = action.payload.success;
      })
      .addCase(fetchLogout.rejected, (state) => {
        state.success = false;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.success = action.payload.success;
      })
      .addCase(fetchRegister.rejected, (state) => {
        state.success = false;
      })
  }
});

export default formSlice.reducer;
export const { changePasswordVisibility, setValue, resetValues, resetSuccess } = formSlice.actions;