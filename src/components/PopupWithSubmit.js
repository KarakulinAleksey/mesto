import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor({ popupSelector, deleteCard }) {
    super(popupSelector);
    this.deleteCard = deleteCard;
    this._popupForm = this._popup.querySelector(".popup__form");
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  setVal(value, element) {
    this._value = value;
    this._element = element;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.deleteCard(this._value, this._element);
    });
  }
}
