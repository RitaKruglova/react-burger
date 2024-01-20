import PropTypes from 'prop-types';
import store from '../store';

export const ingredientType = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.oneOf(['bun', 'main', 'sauce']),
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number
});

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

export type TIngredientSliceState = {
  dataIngredients: TIngredient[];
  error: null | string | unknown;
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

export type TOrderSliceState = {
  orderNumber: null | number;
  order: null | TOrderResponse;
  error: null | string | unknown;
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