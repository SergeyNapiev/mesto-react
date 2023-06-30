class Api {
    constructor(server, headers) {
      this._server = server;
      this._headers = headers;
    }

    // карточки
    getInitialCards() {
        return fetch(`${this._server}/cards`, {
            method: 'GET',
            headers: {
                authorization: this._headers
          }
        })
          .then(res => {
            if (res.ok) {
              return res.json();
            }
      
            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${res.status}`);
          });
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
              .then(res => {
                if (res.ok) {
                  return res.json();
                }
          
                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
              });
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
      .then(res => {
        if (res.ok) {
          return res.json();
        }

      // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    };

    // // поставить лайк
    likeCard(cardId) {
      return fetch(`${this._server}/cards/${cardId}/likes`, {
          method: 'PUT',
          headers: {
            authorization: this._headers,
            'Content-Type': 'application/json'
          },
      }).then(res => {
        if (res.ok) {
          return res.json();
        }

      // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    };

  // удалить лайк
  deleteLikeCard(cardId) {
      return fetch(`${this._server}/cards/${cardId}/likes`, {
          method: 'DELETE',
          headers: {
            authorization: this._headers,
            'Content-Type': 'application/json'
          },
      }).then(res => {
        if (res.ok) {
          return res.json();
        }

      // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    };
    // профиль получаем данные
    getUserInfo() {
        return fetch(`${this._server}/users/me`, {
            method: 'GET',
            headers: {
              authorization: this._headers,
            }
          })
          .then(res => {
            if (res.ok) {
              return res.json();
            }
      
            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${res.status}`);
          });
    }
    // профиль изменить данные
    editUserInfo(item) {
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
          .then(res => {
            if (res.ok) {
              return res.json();
            }
      
            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${res.status}`);
          });
    }

    // установить аватар
    setNewAvatar(item) {
        return fetch(`${this._server}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
              authorization: this._headers,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: item.link
              })
          })
          .then(res => {
            if (res.ok) {
              return res.json();
            }
      
            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${res.status}`);
          });
    }
  }
  
  const api = new Api(
    'https://mesto.nomoreparties.co/v1/cohort-66',
     '8b9a19d7-8eaa-4ed2-bd32-0131ce488f0d',
 ); 

  export default api;