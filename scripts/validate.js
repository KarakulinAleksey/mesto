// @ts-nocheck
//переменная формы "редактирования профиля"
const formElement = document.querySelector('.popup__form_edit-profile');
// console.log(formElement);

//переменная инпута-ИМЯ "редактирования профиля"
const formInput = formElement.querySelector('.popup__form-input_type_name');
// const formInput = formElement.querySelectorAll('.popup__form-input');
// console.log(formInput);

//функция добавления класса "красная линия"
const showInputError = function(element){
  element.classList.add('popup__form-input_status-error');
};
//функция удаления класса "красная линия"
const hideInputError = function(element){
  element.classList.remove('popup__form-input_status-error');
};
//переменная спан инпута ИМЯ
const nameInputError = formElement.querySelector('.name-input-error');
//console.log(nameInputError);

//функция добавления класса вывести текст ошибки инпута ИМЯ
const shownameInputError = function(element){
  element.classList.add('popup__input-error');
};
//функция удаления класса вывести текст ошибки инпута ИМЯ
const hidenameInputError = function(element){
  element.classList.remove('popup__input-error');
};

const enableValidation = function(){
  if (!formInput.validity.valid){
    //console.log(formInput.validity.valid);
    showInputError(formInput);
    shownameInputError(nameInputError)
  }else{
    hideInputError(formInput);
    hidenameInputError(nameInputError);
    //console.log(formInput.validity.valid);
  }
};

formElement.addEventListener('submit',function(evt){
  evt.preventDefault();
});

formInput.addEventListener('input',enableValidation);








// включение валидации вызовом enableValidation
// все настройки передаются при вызове

/*enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); */
