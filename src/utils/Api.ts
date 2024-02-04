import { API_URL } from '../constants/constants';
import { checkResponse } from './check-response';
import { emitAccessTokenChangedEvent } from './events';
import { IApi, IUserInfo, TMethod } from './types';

class Api {
  private _url: string;
  private _headers: HeadersInit;

  constructor({ url, headers }: IApi) {
    this._url = url;
    this._headers = headers;
  }

  private _fetch(url: string = '', method: TMethod, body?: any, headers: HeadersInit = {}): Promise<any> {
    return fetch(`${this._url}${url}`, {
      method,
      headers: {
        ...this._headers,
        ...headers
      },
      body: body ? JSON.stringify(body) : null
    })
      .then(checkResponse)
      .catch(err => {
        if (err.message.includes('403')) {
          return this.refreshToken(localStorage.getItem('refreshToken'))
            .then(res => {
              localStorage.setItem('accessToken', res.accessToken);
              emitAccessTokenChangedEvent();
              return this._fetch(url, method, body, {
                ...headers,
                'authorization': res.accessToken
              });
            })
        }
        return Promise.reject(err);
      })
  }

  getIngredients(): Promise<any> {
    return this._fetch('/ingredients', 'GET');
  }

  createOrder(ingredientsIdArray: string[], token: string | null): Promise<any> {
    return this._fetch('/orders', 'POST', {
      'ingredients': ingredientsIdArray
    }, {
      authorization: `Bearer ${token}`
    })
  }

  resetPassword(emailValue: string): Promise<any> {
    return this._fetch('/password-reset', 'POST', {
      'email': emailValue
    })
  }

  setPassword(newPasswordValue: string, codeValue: string): Promise<any> {
    return this._fetch('/password-reset/reset', 'POST', {
      'password': newPasswordValue,
      'token': codeValue
    })
  }

  register(emailValue: string, passwordValue: string, nameValue: string): Promise<any> {
    return this._fetch('/auth/register', 'POST', {
      'email': emailValue, 
      'password': passwordValue, 
      'name': nameValue
    })
  }

  login(emailValue: string, passwordValue: string): Promise<any> {
    return this._fetch('/auth/login', 'POST', {
      'email': emailValue, 
      'password': passwordValue
    })
  }

  refreshToken(token: string | null): Promise<any> {
    return this._fetch('/auth/token', 'POST', {
      'token': token
    })
  }

  logout(token: string | null): Promise<any> {
    return this._fetch('/auth/logout', 'POST', {
      'token': token
    })
  }

  getUser(token: string | null): Promise<any> {
    return this._fetch('/auth/user', 'GET', null, {
      authorization: `Bearer ${token}`
    })
  }

  changeUserInfo(info: IUserInfo, token: string | null): Promise<any> {
    return this._fetch('/auth/user', 'PATCH', {
      ...(info.name ? {'name': info.name} : {}),
      ...(info.email ? {'email': info.email} : {}),
      ...(info.password ? {'password': info.password} : {})
    }, {
      authorization: `Bearer ${token}`
    })
  }
}

const api = new Api({
  url: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export { api }