export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(new Error(`Что-то пошло не так: ${res.status}`));
}