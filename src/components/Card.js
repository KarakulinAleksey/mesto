
export default class Card {
  constructor({ data, handleCardClick, handleDeleteIconClick, handleLikeClick}, cardSelector, cardIdMe) {
    //debugger;
    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._handleLikeClick = handleLikeClick;
    this._cardIdMe = cardIdMe;
    this._cardIdOwer = data.owner._id;
    this._cardId = data._id
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    this._element = this._getTemplate(); //копия темплэйта
    this._countLikee = this._element.querySelector(".elements__count-likee");
    this._buttonRemove = this._element.querySelector(".elements__button-remove");
    this._image = this._element.querySelector(".elements__image"); //картинка
    this._title = this._element.querySelector(".elements__title"); //название картинки
    this._buttonLikee = this._element.querySelector(".elements__image-likee"); //кнопка лайке
    this._buttonDelete = this._element.querySelector(".elements__button-remove"); //кнопка удления карточки
  }
  //----------------найти эллемент темплейта карточки и сделать копию------------------\\
  _getTemplate() {
    const cardElement = this._cardSelector.content.querySelector(".elements__element").cloneNode(true);
    return cardElement;
  }
  //----------------создать карточку---------------------------------------------------\\

  _setEventListeners() {
    this._setEventListenersLike();
    this._setEventListenersDelet();
    this._setEventListenersImage();

  }

  generateCard() {
    this._image.alt = this._name;
    this._image.src = this._link;
    this._title.textContent = this._name;
    this._countLikee.textContent = this._likes.length;
    this._setButtonRemove();
    this._setEventListeners();

    return this._element;
  }

  //*--------------добавить событие кнопки likee-----------------------------------\\
  _setEventListenersLike() {
      this._buttonLikee.addEventListener("click", (evt)=> {
      const evtTarget = evt.target;
      if (!evtTarget.classList.contains("elements__image-like_active")){
        evtTarget.classList.toggle("elements__image-like_active");
        this._handleLikeClick(this._cardId, this._countLikee, true);
      }
      else{
        evtTarget.classList.toggle("elements__image-like_active");
        this._handleLikeClick(this._cardId, this._countLikee, false);
      }
    });
  }


  //*--------------добавить событие кнопки удаления-----------------------------------\\
  _setEventListenersDelet() {
    this._buttonDelete.addEventListener("click", () => {
      this._handleDeleteIconClick(this._cardId, this._element);
    });
  }

  //*-----------добавить событие картинки-----------------------------\\
  _setEventListenersImage() {
    this._image.addEventListener("click", () => {
      this._handleCardClick(this._link, this._name);
    });
  }

  //--------------метод включения кнопки удпления---------------//
  _setButtonRemove(){
    if (this._cardIdMe === this._cardIdOwer){
      this._buttonRemove.classList.add('popup_show');
    }
  }
}




