import formReducer, {
  changePasswordVisibility,
  setValue,
  resetValues,
  resetCurrentUser
} from './formSlice';
import { initialState } from './formSlice';

describe('formSlice', () => {
  it('should return default state when passed an empty state', () => {
    const result = formReducer(undefined, { type: ''});

    expect(result).toEqual(initialState);
  });

  it('should change isPasswordVisible to the opposite', () => {
    const action = { type: changePasswordVisibility.type }

    const result = formReducer({ isPasswordVisible: false }, action);

    expect(result.isPasswordVisible).toEqual(true);
  });

  it('should set values to the values state', () => {
    const action = { type: setValue.type, payload: { name: 'name', value: 'Alex' }}

    const result = formReducer({ values: {} }, action);

    expect(result.values).toEqual({ name: 'Alex' });
  });

  it('should clean values state', () => {
    const action = { type: resetValues.type }

    const result = formReducer({ values: { name: 'Alex '}}, action);

    expect(result.values).toEqual({});
  });

  it('should clean currentUser state', () => {
    const action = { type: resetCurrentUser.type }

    const result = formReducer({ currentUser: { name: 'Alex', email: 'alex1995@yandex.ru '}}, action);

    expect(result.currentUser).toEqual({ name: '', email: ''});
  })
})