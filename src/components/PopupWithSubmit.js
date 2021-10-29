import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  // constructor({ popupSelector, handleFormSubmit }) {
    constructor({ popupSelector, deleteCard}) {
    super(popupSelector);
    this.deleteCard = deleteCard;
    this._popup = document.querySelector(popupSelector);
    this._popupForm = this._popup.querySelector(".popup__form");
    // this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popup.querySelectorAll(".popup__form-input");
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  setVal(value, element){
    // console.log(value);
    this._value = value;
    this._element = element;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      // this._handleFormSubmit(this._getInputValues());
      this.deleteCard(this._value, this._element);
      this.close();
    });
  }
}
