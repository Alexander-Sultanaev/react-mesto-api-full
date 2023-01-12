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
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'content-type': 'application/json'
      },
    })
    .then(res => this._checkResponse(res))
  }

  addCar(data){
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'content-type': 'application/json'
      },
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
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'content-type': 'application/json'
      },
    })
    .then(res => this._checkResponse(res))
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`,{
      method: `${!isLiked ? 'DELETE' : 'PUT'}`,
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'content-type': 'application/json'
      }
    })
    .then(res => this._checkResponse(res))
  }

  getUserInfo(){
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'content-type': 'application/json'
      },
      method: 'GET'
    })
    .then(res => this._checkResponse(res))
  }

  setUserInfo(data){
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'content-type': 'application/json'
      },
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
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then(res => this._checkResponse(res))
  }
}

const api = new Api({
  url: 'http://api.dbmesto.nomoredomains.club/',
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'content-type': 'application/json'
  },
});
export default api;