import { API_URL } from "../constants/constants";
import { checkResponse } from "./check-response";

class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _fetch(url = '', method = 'GET', body = null) {
    return fetch(`${this._url}${url}`, {
      method,
      headers: this._headers,
      body
    })
      .then(checkResponse)
  }

  getIngredients() {
    return this._fetch();
  }
}

const api = new Api({
  url: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export { api }