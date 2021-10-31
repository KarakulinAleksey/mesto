import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
  constructor(popupSelector){
    super(popupSelector);
    this._popupWithImage = this._popup.querySelector('.popup__image');
    this._popupWithCaption = this._popup.querySelector('.popup__caption');


  }

  open(link, name){
    super.open();
    this._link = link;
    this._name = name;
    this._popupWithImage.src = this._link;
    this._popupWithImage.alt = this._name;
    this._popupWithCaption.textContent = this._name;

  }
}
