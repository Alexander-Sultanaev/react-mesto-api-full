class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _checkResponse(res){
    if(res.ok){
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
    .then(res => this._checkResponse(res))
  }

  addCar(data){
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(res => this._checkResponse(res))
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`,{
      method: 'DELETE',
      headers: this._headers,
    })
    .then(res => this._checkResponse(res))
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`,{
      method: `${!isLiked ? 'DELETE' : 'PUT'}`,
      headers: this._headers
    })
    .then(res => this._checkResponse(res))
  }

  getUserInfo(){
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: 'GET'
    })
    .then(res => this._checkResponse(res))
  }

  setUserInfo(data){
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(res => this._checkResponse(res))
  }

  editUserAvatar(data){
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then(res => this._checkResponse(res))
  }
}

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-50',
  headers: {
    authorization: '1ab05af1-5f6c-42a4-8598-6f7702cd2129',
    'Content-type': 'application/json'
  }
});
export default api;