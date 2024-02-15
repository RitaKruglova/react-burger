import formReducer, {
  changePasswordVisibility,
  setValue,
  resetValues,
  resetCurrentUser,
  fetchResetPassword,
  fetchSetPassword,
  fetchRegister,
  fetchLogin,
  fetchRefreshToken,
  fetchLogout,
  fetchGetUser,
  fetchChangeUserInfo
} from './formSlice';
import { initialState } from './formSlice';
import { api } from '../../utils/Api';

jest.mock('../../utils/Api', () => ({
  api: {
    resetPassword: jest.fn(),
    setPassword: jest.fn(),
    register: jest.fn(),
    login: jest.fn(),
    refreshToken: jest.fn(),
    logout: jest.fn(),
    getUser: jest.fn(),
    changeUserInfo: jest.fn()
  }
}));

describe('formSlice', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully reset password', async () => {
    const mockResponse = { success: true };
    api.resetPassword.mockResolvedValue(mockResponse);
    const dispatch = jest.fn();
    const getState = jest.fn();
    const email = 'test@gmail.com'

    await fetchResetPassword(email)(dispatch, getState, undefined);
  
    expect(api.resetPassword).toHaveBeenCalledWith(email);
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: 'form/fetchResetPassword/fulfilled',
      payload: mockResponse,
      meta: expect.objectContaining({
        arg: email,
        requestStatus: 'fulfilled'
      })
    }));
  });

  it('should successfully set password', async () => {
    const mockResponse = { success: true };
    api.setPassword.mockResolvedValue(mockResponse);
    const dispatch = jest.fn();
    const getState = jest.fn();
    const newPassword = '1234567890';
    const code = 'bgy8gf';

    await fetchSetPassword({ newPasswordValue: newPassword, codeValue: code })(dispatch, getState, undefined);

    expect(api.setPassword).toHaveBeenCalledWith(newPassword, code);
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: 'form/fetchSetPassword/fulfilled',
      payload: mockResponse,
      meta: expect.objectContaining({
        arg: { newPasswordValue: newPassword, codeValue: code },
        requestStatus: 'fulfilled'
      })
    }));
  });

  it('should successfully register', async () => {
    const mockResponse = { success: true };
    api.register.mockResolvedValue(mockResponse);
    const dispatch = jest.fn();
    const getState = jest.fn();
    const email = 'test@gmail.com';
    const password = '12345678';
    const name = 'Alex';

    await fetchRegister({ emailValue: email, passwordValue: password, nameValue: name })(dispatch, getState, undefined);

    expect(api.register).toHaveBeenCalledWith(email, password, name);
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: 'form/fetchRegister/fulfilled',
      payload: mockResponse,
      meta: expect.objectContaining({
        arg: { emailValue: email, passwordValue: password, nameValue: name },
        requestStatus: 'fulfilled'
      })
    }));
  });

  it('should successfully login', async () => {
    const mockResponse = { success: true };
    api.login.mockResolvedValue(mockResponse);
    const dispatch = jest.fn();
    const getState = jest.fn();
    const email = 'test@gmail.com';
    const password = '12345678';

    await fetchLogin({ emailValue: email, passwordValue: password })(dispatch, getState, undefined);

    expect(api.login).toHaveBeenCalledWith(email, password);
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: 'form/fetchLogin/fulfilled',
      payload: mockResponse,
      meta: expect.objectContaining({
        arg: { emailValue: email, passwordValue: password },
        requestStatus: 'fulfilled'
      })
    }));
  });

  it('should successfully refresh token', async () => {
    const mockResponse = { success: true };
    api.refreshToken.mockResolvedValue(mockResponse);
    const dispatch = jest.fn();
    const getState = jest.fn();
    const token = 'test';

    await fetchRefreshToken(token)(dispatch, getState, undefined);

    expect(api.refreshToken).toHaveBeenCalledWith(token);
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: 'form/fetchRefreshToken/fulfilled',
      payload: mockResponse,
      meta: expect.objectContaining({
        arg: token,
        requestStatus: 'fulfilled'
      })
    }));
  });

  it('should successfully logout', async () => {
    const mockResponse = { success: true };
    api.logout.mockResolvedValue(mockResponse);
    const dispatch = jest.fn();
    const getState = jest.fn();
    const token = 'test';

    await fetchLogout(token)(dispatch, getState, undefined);

    expect(api.logout).toHaveBeenCalledWith(token);
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: 'form/fetchLogout/fulfilled',
      payload: mockResponse,
      meta: expect.objectContaining({
        arg: token,
        requestStatus: 'fulfilled'
      })
    }));
  });

  it('should successfully return user', async () => {
    const mockResponse = { success: true };
    api.getUser.mockResolvedValue(mockResponse);
    const dispatch = jest.fn();
    const getState = jest.fn();
    const token = 'test';

    await fetchGetUser(token)(dispatch, getState, undefined);

    expect(api.getUser).toHaveBeenCalledWith(token);
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: 'form/fetchGetUser/fulfilled',
      payload: mockResponse,
      meta: expect.objectContaining({
        arg: token,
        requestStatus: 'fulfilled'
      })
    }));
  });

  it('should successfully change user info', async () => {
    const mockResponse = { success: true };
    api.changeUserInfo.mockResolvedValue(mockResponse);
    const dispatch = jest.fn();
    const getState = jest.fn();
    const accessToken = 'test';
    const info = {
      name: 'Alex',
      email: 'test@gmail.com',
      password: '1234567890'
    };

    await fetchChangeUserInfo({ info, accessToken })(dispatch, getState, undefined);

    expect(api.changeUserInfo).toHaveBeenCalledWith(info, accessToken);
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: 'form/fetchChangeUserInfo/fulfilled',
      payload: mockResponse,
      meta: expect.objectContaining({
        arg: { info, accessToken },
        requestStatus: 'fulfilled'
      })
    }));
  });

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