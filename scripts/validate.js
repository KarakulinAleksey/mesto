// @ts-nocheck
//функция изменения цвета input и вывода текста сообщения об ошибке
const showInputError = function(formElement, inputElement, errorMessage, inputErrorClass, errorClass){
  const nameInputError = formElement.querySelector(`.${inputElement.name}-input-error`);
  inputElement.classList.add(inputErrorClass);
  nameInputError.textContent = errorMessage;
  nameInputError.classList.add(errorClass);
}

const hideInputError = function(formElement, inputElement, inputErrorClass, errorClass){
const nameInputError = formElement.querySelector(`.${inputElement.name}-input-error`);
inputElement.classList.remove(inputErrorClass);
nameInputError.classList.remove(errorClass);
nameInputError.textContent = "";
}
//функция проверки на валидность, если не валидны выводим сообщения об ошибке
const isValid = function(formElement, inputElement, inputErrorClass, errorClass){
  if (!inputElement.validity.valid){
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  }
  else
  {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
}
//функция проверки на валидность элементов формы
const hasIvalidInput = function(inputList){
  return inputList.some(function(inputElement){
    return !inputElement.validity.valid;
  });
};
//функция дизактивации кнопки отправить
const toggleButtonState = function(inputList, buttonElement, inactiveButtonClass){
  if(hasIvalidInput(inputList)){
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  }
  else
  {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
};
//функция добавления слушателя input
const setEventListener = function(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass){
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach(function(inputElement){
    inputElement.addEventListener('input',function(){
      isValid (formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};
//функция добавления слушателя form
const enableValidation = function({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}){
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach(function(formElement){
    formElement.addEventListener('submit',function(evt){
      evt.preventDefault();
    });
    setEventListener(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
  });
};

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-button-save',
  inactiveButtonClass: 'popup__form-button-save_type_unable',
  inputErrorClass: 'popup__form-input_status-error',
  errorClass: 'popup__input-error'
});
