import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector(".popup__form");
    this._popupButtonSave = this._popup.querySelector(".popup__form-button-save");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popup.querySelectorAll(".popup__form-input");
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.renderLoading(true);
      this._handleFormSubmit(this._getInputValues());
      // this.renderLoading(false);
    });
  }

  renderLoading(isLoading){
    if (isLoading){
      this._popupButtonSave.textContent = "Сохранение..."
    }
    else
    {
      this._popupButtonSave.textContent = "Сохранить"
    }
  }
}
