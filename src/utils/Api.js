import { API_URL } from "../constants/constants";
import { checkResponse } from "./check-response";

class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _fetch(url = '', method = 'GET', body) {
    return fetch(`${this._url}${url}`, {
      method,
      headers: this._headers,
      body: body ? JSON.stringify(body) : null
    })
      .then(checkResponse)
  }

  getIngredients() {
    return this._fetch('/ingredients');
  }

  createOrder(ingredientsIdArray) {
    return this._fetch('/orders', 'POST', {
      "ingredients": ingredientsIdArray
    })
  }

  resetPassword(emailValue) {
    return this._fetch('/password-reset', 'POST', {
      "email": emailValue
    })
  }

  setPassword(newPasswordValue, codeValue) {
    return this._fetch('password-reset/reset', 'POST', {
      "password": newPasswordValue,
      "token": codeValue
    })
  }

  register(emailValue, passwordValue, nameValue) {
    return this._fetch('/auth/register', 'POST', {
      "email": emailValue, 
      "password": passwordValue, 
      "name": nameValue
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