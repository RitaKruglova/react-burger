import { API_URL } from '../constants/constants';
import { checkResponse } from './check-response';

class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _fetch(url = '', method, body, headers = {}) {
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
              return this._fetch(url, method, body, {
                ...headers,
                'authorization': res.accessToken
              });
            })
        }
        return Promise.reject(err);
      })
  }

  getIngredients() {
    return this._fetch('/ingredients', 'GET');
  }

  createOrder(ingredientsIdArray) {
    return this._fetch('/orders', 'POST', {
      'ingredients': ingredientsIdArray
    })
  }

  resetPassword(emailValue) {
    return this._fetch('/password-reset', 'POST', {
      'email': emailValue
    })
  }

  setPassword(newPasswordValue, codeValue) {
    return this._fetch('/password-reset/reset', 'POST', {
      'password': newPasswordValue,
      'token': codeValue
    })
  }

  register(emailValue, passwordValue, nameValue) {
    return this._fetch('/auth/register', 'POST', {
      'email': emailValue, 
      'password': passwordValue, 
      'name': nameValue
    })
  }

  login(emailValue, passwordValue) {
    return this._fetch('/auth/login', 'POST', {
      'email': emailValue, 
      'password': passwordValue
    })
  }

  refreshToken(token) {
    return this._fetch('/auth/token', 'POST', {
      'token': token
    })
  }

  logout(token) {
    return this._fetch('/auth/logout', 'POST', {
      'token': token
    })
  }

  getUser(token) {
    return this._fetch('/auth/user', 'GET', null, {
      authorization: `Bearer ${token}`
    })
  }

  changeUserInfo(info, token) {
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