class Api {
  constructor(server, headers) {
    this._server = server;
    this._headers = headers;
  }

  // карточки
  getCardList() {
      return fetch(`${this._server}/cards`, {
          method: 'GET',
          headers: {
              authorization: this._headers
        }
      })
      .then(this._checkResponse)
  } 
      // новая карточка

      addNewCard(item) {
          return fetch(`${this._server}/cards`, {
              method: 'POST',
              headers: {
                authorization: this._headers,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  name: item.name,
                  link: item.link
                })
            })
            .then(this._checkResponse)
      }
  // удалить карточку
  removeCardFromServer(id) {
    return fetch(`${this._server}/cards/${id}`, {
      method: 'DELETE',
      headers: {
          authorization: this._headers,
          'Content-Type': 'application/json'
      },
    })
    .then(this._checkResponse)
  };


changeLikeCardStatus(cardId, isLiked) {
  const method = isLiked ? 'PUT' : 'DELETE';

  return fetch(`${this._server}/cards/likes/${cardId}`, {
    method: method,
    headers: {
      authorization: this._headers,
      'Content-Type': 'application/json',
    },
  })
  .then(this._checkResponse)
}
  // профиль получаем данные
  getUserInfo() {
      return fetch(`${this._server}/users/me`, {
          method: 'GET',
          headers: {
            authorization: this._headers,
          }
        })
        .then(this._checkResponse)
  }
  // профиль изменить данные
  setUserInfo(item) {
      return fetch(`${this._server}/users/me`, {
          method: 'PATCH',
          headers: {
            authorization: this._headers,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              name: item.name,
              about: item.about
            })
        })
        .then(this._checkResponse)
  }

  // установить аватар
  setUserAvatar(item) {
    return fetch(`${this._server}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          authorization: this._headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: item.avatar
          })
      })
      .then(this._checkResponse)
  }

  _checkResponse(res) {
      if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

}



const api = new Api(
  'https://mesto.nomoreparties.co/v1/cohort-66',
   '8b9a19d7-8eaa-4ed2-bd32-0131ce488f0d',
); 

export default api;