import PropTypes from 'prop-types';

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