export const BASE_URL = 'http://api.dbmesto.nomoredomains.club';

const checkResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.statusText}`)
const headers = {
  'Content-Type': 'application/json',
};
export const register = ({ email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ email, password }),
  })
  .then(checkResponse)
};

export const authorize = ({ email, password }) => {
  return fetch (`${BASE_URL}/signin`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ email, password })
  })
  .then(checkResponse)
};

export const getContent = (token) => {
  return fetch (`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`
    },
  })
  .then(checkResponse)
};