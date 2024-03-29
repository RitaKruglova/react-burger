import store from '../store';

export type TIngredient = {
  _id: string;
  name: string;
  type: 'bun' | 'main' | 'sauce';
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  uuid?: string;
  count?: number;
}

export type TBun = Omit<TIngredient, 'type'> & { type: 'bun' }

export interface IApi {
  url: string;
  headers: HeadersInit;
}

export interface IUserInfo {
  name?: string;
  email?: string;
  password?: string;
}

export type TMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

export type TUser = {
  email: string;
  name: string;
}

export type TFormSliseState = {
  isPasswordVisible: boolean;
  values: Record<string, string>;
  currentUser: TUser;
}

export type TRootState = ReturnType<typeof store.getState>;

export type TAppDispatch = typeof store.dispatch;

export type TSetPasswordArgs = {
  newPasswordValue: string;
  codeValue: string;
}

export type TLoginArgs = {
  emailValue: string;
  passwordValue: string;
}

export type TTokens = {
  accessToken: string;
  refreshToken: string;
}

export type TSuccess = { success: boolean }

export type TRegisterArgs = TLoginArgs & { nameValue: string; }

export type TLoginAndRegisterResponse = { user: TUser; } & TTokens & TSuccess;

export type TNameAndValue = {
  name: string;
  value: string;
}

export type TRefreshTokenResponse = TSuccess & TTokens;

export type TGetUserResponse = TSuccess & {
  user: TUser;
}

export type TError = null | string | unknown;

export type TIngredientSliceState = {
  dataIngredients: TIngredient[];
  error: TError;
  draggedIngredients: TIngredient[];
  bun: TBun;
  currentIngredient: null | TIngredient;
}

export type TDropIngredientAction = {
  ingredient: TIngredient;
  index: number
}

export type TLoadingSliceState = {
  isLoading: boolean;
}

export type TCurrentOrder = {
  number: number;
  name: string;
  statusText: string;
  ingredients: TIngredient[]
  date: Date;
  price: number
}

export type TOrderNumber = null | number;

export type TOrderSliceState = {
  orderNumber: TOrderNumber;
  order: null | TOrderResponse;
  error: null | string | unknown;
  currentOrder: TCurrentOrder | null;
}

export type TOrderResponse = {
  name: string;
  order: {
      number: number;
  };
  success: boolean;
}

export type TTabsSliceState = {
  currentTab: string;
}

export type TInitialStateIsEditing = Record<string, boolean>;

export type TOrder = {
  ingredients: string[];
  _id: string;
  status: string;
  name: string;
  number: number;
  createdAt: string;
  updatedAt: string;
}

export type TWebSocketResponse = {
  success: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
}

export type TTotal = {
  total: number,
  totalToday: number
}

export type TWebSocketSliceState = {
  wsConnected: boolean;
  allOrders: TOrder[];
  myOrders: TOrder[];
  total: TTotal;
  error: boolean;
}
