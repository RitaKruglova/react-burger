import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../utils/Api";
import { IUserInfo, TFormSliseState, TLoginArgs, TLoginAndRegisterResponse, TNameAndValue, TRegisterArgs, TSetPasswordArgs, TRefreshTokenResponse, TGetUserResponse } from "../../utils/types";

function saveTokens(action: PayloadAction<TRefreshTokenResponse>) {
  localStorage.setItem('refreshToken', action.payload.refreshToken);
  localStorage.setItem('accessToken', action.payload.accessToken.split(' ')[1]);
}

export const fetchResetPassword = createAsyncThunk(
  'form/fetchResetPassword',
  async (emailValue: string): Promise<any> => {
    const response = await api.resetPassword(emailValue);
    return response;
  }
);

export const fetchSetPassword = createAsyncThunk(
  'form/fetchSetPassword',
  async ({ newPasswordValue, codeValue }: TSetPasswordArgs): Promise<any> => {
    const response = await api.setPassword(newPasswordValue, codeValue);
    return response;
  }
)

export const fetchRegister = createAsyncThunk(
  'form/fetchRegister',
  async ({ emailValue, passwordValue, nameValue }: TRegisterArgs): Promise<any> => {
    const response = await api.register(emailValue, passwordValue, nameValue);
    return response;
  }
)

export const fetchLogin = createAsyncThunk(
  'form/fetchLogin',
  async ({ emailValue, passwordValue }: TLoginArgs): Promise<any> => {
    const response = await api.login(emailValue, passwordValue);
    return response;
  }
)

export const fetchRefreshToken = createAsyncThunk(
  'form/fetchRefreshToken',
  async (token: string | null): Promise<any> => {
    const response = await api.refreshToken(token);
    return response;
  }
)

export const fetchLogout = createAsyncThunk(
  'form/fetchLogout',
  async (token: string | null): Promise<any> => {
    const response = await api.logout(token);
    return response;
  }
)

export const fetchGetUser = createAsyncThunk(
  'form/fetchGetUser',
  async (token: string | null): Promise<any> => {
    const response = await api.getUser(token);
    return response;
  }
)

export const fetchChangeUserInfo = createAsyncThunk(
  'form/fetchChangeUserInfo',
  async ({info, accessToken}: {info: IUserInfo; accessToken: string | null}): Promise<any> => {
    const response = await api.changeUserInfo(info, accessToken);
    return response;
  }
)

const formSlice = createSlice({
  name: 'form',
  initialState: {
    isPasswordVisible: false,
    values: {},
    currentUser: {
      email: '',
      name: ''
    }
  } as TFormSliseState,
  reducers: {
    changePasswordVisibility: (state) => {
      state.isPasswordVisible = !state.isPasswordVisible;
    },
    setValue: (state, action: PayloadAction<TNameAndValue>) => {
      state.values[action.payload.name] = action.payload.value;
    },
    resetValues: (state) => {
      state.values = {}
    },
    resetCurrentUser: (state) => {
      state.currentUser = {
        email: '',
        name: ''
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.fulfilled, (state, action: PayloadAction<TLoginAndRegisterResponse>) => {
        saveTokens(action);
        state.currentUser = action.payload.user;
      })
      .addCase(fetchRegister.fulfilled, (state, action: PayloadAction<TLoginAndRegisterResponse>) => {
        saveTokens(action);
        state.currentUser = action.payload.user;
      })
      .addCase(fetchRefreshToken.fulfilled, (state, action: PayloadAction<TRefreshTokenResponse>) => {
        saveTokens(action);
      })
      .addCase(fetchGetUser.fulfilled, (state, action: PayloadAction<TGetUserResponse>) => {
        state.currentUser = action.payload.user;
      })
      .addCase(fetchGetUser.rejected, () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .addCase(fetchChangeUserInfo.fulfilled, (state, action: PayloadAction<TGetUserResponse>) => {
        state.currentUser = action.payload.user;
      })
  }
});

export default formSlice.reducer;
export const { changePasswordVisibility, setValue, resetValues,resetCurrentUser } = formSlice.actions;