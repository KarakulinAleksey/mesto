
 export default class Card {
    constructor({data, handleCardClick}, cardSelector){
    this._handleCardClick = handleCardClick;
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._element = this._getTemplate(); //копия темплэйта
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
  generateCard(){
    this._image.alt = this._name;
    this._image.src = this._link;
    this._title.textContent = this._name;

    this._setEventListenersLike();
    this._setEventListenersDelet();
    this._setEventListenersImage();

    return this._element;
  }

  //*--------------добавить событие кнопки likee-----------------------------------\\
  _setEventListenersLike(){
    this._buttonLikee.addEventListener("click", function (evt) {
      const evtTarget = evt.target;
      evtTarget.classList.toggle("elements__image-like_active");
    });
  }

  //*--------------добавить событие кнопки удаления-----------------------------------\\
  _setEventListenersDelet(){
    this._buttonDelete.addEventListener("click", () => {
      this._element.remove();
    });
  }

 //*-----------добавить событие картинки-----------------------------\\
 _setEventListenersImage(){
  this._image.addEventListener("click", (evt)=>{
    const evtTarget = evt.target;
    this._handleCardClick(evtTarget, this._title.textContent)
  });
  }
}




