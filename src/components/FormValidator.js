export default class FormValidator {
  constructor(validationConfig, сheckForm) {
    (this._formSelector = validationConfig.formSelector), //форма попапа
      (this._inputSelector = validationConfig.inputSelector), //проверяемые инпуты
      (this._submitButtonSelector = validationConfig.submitButtonSelector), //кнопка сохранить
      (this._inactiveButtonClass = validationConfig.inactiveButtonClass), //класс деактивации кнопки сохранить
      (this._inputErrorClass = validationConfig.inputErrorClass), //класс изменяет цвет рамки при ошибки валидации
      (this._errorClass = validationConfig.errorClass), //класс стилизует сообщение ошибки
      (this._checkForm = сheckForm), //передаём форму которую нужно валидировать
      (this._inputList = Array.from(
        this._checkForm.querySelectorAll(this._inputSelector)
      )); //массив проверяемых инпутов
    this._buttonElement = this._checkForm.querySelector(
      this._submitButtonSelector
    ); //кнопка сохранить
  }

  //функция изменения цвета input и вывода текста сообщения об ошибке
  _showInputError(inputElement, errorMessage) {
    const nameInputError = this._checkForm.querySelector(
      `.${inputElement.name}-input-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    nameInputError.textContent = errorMessage;
    nameInputError.classList.add(this._errorClass);
  }

  //функция изменения цвета input и скрытие текста сообщения об ошибке
  _hideInputError(inputElement) {
    const nameInputError = this._checkForm.querySelector(
      `.${inputElement.name}-input-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    nameInputError.classList.remove(this._errorClass);
    nameInputError.textContent = "";
  }

  //функция проверки на валидность, если не валидны выводим сообщения об ошибке
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //функция проверки на валидность элементов формы
  _hasIvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //функция дизактивации кнопки отправить
  _toggleButtonState() {
    if (this._hasIvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  //функция добавления слушателя input
  _setEventListener() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  //----------------отменить отправку формы вызвать функцию добавления слушателя инпутов--------//
  enableValidation() {
    const formList = this._checkForm;
    this._setEventListener();
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}
