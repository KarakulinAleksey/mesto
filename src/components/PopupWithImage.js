import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
  constructor(popupSelector, itemEvtTarget, itemTitleImage){
    super(popupSelector);
    this._popupWithImage = popupSelector.querySelector('.popup__image');
    this._popupWithCaption = popupSelector.querySelector('.popup__caption');
    this._itemEvtTarget = itemEvtTarget;
    this._itemTitleImage = itemTitleImage;

  }

  setEventListeners(){
    super.setEventListeners();
  }

  open(){
    super.open();
    this.setEventListeners();
    this._popupWithImage.src = this._itemEvtTarget.src;
    this._popupWithImage.alt = this._itemEvtTarget.alt;
    this._popupWithCaption.textContent = this._itemTitleImage;

  }
}
