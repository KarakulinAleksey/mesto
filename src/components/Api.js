export default class Api{
  constructor(){
    this._urlAllCards = "https://mesto.nomoreparties.co/v1/cohort-29/cards/";
    this._urlUserInfo = "https://nomoreparties.co/v1/cohort-29/users/me";
    this._urlAvatar = "https://nomoreparties.co/v1/cohort-29/users/me/avatar";
    this._urlLikes = "https://mesto.nomoreparties.co/v1/cohort-29/cards/likes/"
    this._authorization = "76bc0008-f467-484c-9d7d-ba27b504e337";
    this._contentType = "application/json";
  }

//---------метод запроса с сервера всех карточек-------//
  getAllCards(){
    return fetch(this._urlAllCards,{
      method: 'GET',
      headers: {
        authorization: this._authorization,
        "content-type": this._contentType
        }
      })
      .then((res) => {
        if (res.ok){
          return res.json();
        }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
//------------метод запроса с сервера информации пользователя-----//
  getUserInfo(){
    return fetch(this._urlUserInfo,{
      method: 'GET',
      headers: {
        authorization: this._authorization,
        "content-type": this._contentType
        }
      })
      .then((res) => {
        if (res.ok){
          return res.json();
        }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
//-------------метод обновления информации пользователя----------//
  editUserInfo(userName, userAbout){
    this._userName = userName;
    this._userAbout = userAbout;
   return fetch(this._urlUserInfo, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
    },
    body: JSON.stringify({
      name: this._userName,
      about: this._userAbout
      })
    })
    .then((res) => {
      if (res.ok){
          return res.json();
        }
     return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
//-------------метод добавления новой карточки---------------//
  addCard(cardName, cardLink){
    this._cardName = cardName;
    this._cardLink = cardLink;
    return fetch(this._urlAllCards, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
    },
      body: JSON.stringify({
        "name": this._cardName,
        "link": this._cardLink
      })
    })
    .then((res) => {
      if (res.ok){
        return res.json();
      }
    return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
//---------------метод удаления карточки-----------//
  deleteCard(idCard){
    this._idCard = idCard;
    return fetch(`${this._urlAllCards}${idCard}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
    }
    })
    .then((res) => {
      if (res.ok){
        return res.json();
      }
    return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
//---------------метод обновления аватара------------//
  editAvatar(avatar){
    this._avatar = avatar;
  return fetch(this._urlAvatar, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
    },
    body: JSON.stringify({
      avatar: this._avatar,
      })
    })
    .then((res) => {
      if (res.ok){
          return res.json();
        }
    return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  //-------------метод постановки лайка-------//
  likeCard(idCard, isLike){
    if (isLike){
      this._idCard = idCard;
      return fetch(`${this._urlLikes}${idCard}`, {
        method: 'PUT',
        headers: {
          authorization: this._authorization,
          'Content-Type': this._contentType
      }
      })
      .then((res) => {
        if (res.ok){
          return res.json();
        }
      return Promise.reject(`Ошибка: ${res.status}`);
      });
    }
  else
    {
      this._idCard = idCard;
      return fetch(`${this._urlLikes}${idCard}`, {
        method: 'DELETE',
        headers: {
          authorization: this._authorization,
          'Content-Type': this._contentType
      }
      })
      .then((res) => {
        if (res.ok){
          return res.json();
        }
      return Promise.reject(`Ошибка: ${res.status}`);
      });
    }
  }



  //-------------метод снятия лайка-------//
  deleteLikeCard(idCard){
    this._idCard = idCard;
    return fetch(`${this._urlLikes}${idCard}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
    }
    })
    .then((res) => {
      if (res.ok){
        return res.json();
      }
    return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

};



