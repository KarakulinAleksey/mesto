//---------переменные с главной страницы---------------------------//
const profile = document.querySelector(".profile");
const profileFigure = profile.querySelector(".profile__figure");
const profileInfo = profileFigure.querySelector(".profile__info");
export const profileTitle = profileInfo.querySelector(".profile__title"); //эллемент с гл.страницы имя профиля
export const profileText = profileInfo.querySelector(".profile__text"); //эллемент с гл.страницы профессия
export const profileEditButton = profileFigure.querySelector(".profile__edit-button"); //кнопка редактирование профиля
export const profileAddButton = profile.querySelector(".profile__add-button"); //кнопка добавления карточки
export const profileAvatar = document.querySelector(".profile__avatar-section"); //аватар

//-------переменные для темплейта карточка ----------------------//
export const elementsList = document.querySelector(".elements__list"); //эллемент для загрузки карточек
export const cartTemlate = document.querySelector("#cart-template"); //темплейт карточки

//-------попап просмотр изображеня----------------------------------------//
export const popupTypeViewer = ".popup_type_viewer"; //попап просмотр изображения

//-------попап редактирования аватара----------------------------------------//
export const popupTypeUpdateAvatar = ".popup_type_update-avatar"; //попап редактирования аватара
const popupContainerUpdateAvatar = document.querySelector(".popup__container_type_update-avatar"); // белая форма заполнения
export const popupFormUpdateAvatar = popupContainerUpdateAvatar.querySelector(".popup__form_type_update-avatar"); //форма попапа редактирования аватара

//--------попап редактирование профиля------------------------------------//
export const popupEditProfile = ".popup_type_edit-profile"; //попап редактирование профиля с фоном
const popupContainerEditProfile = document.querySelector(".popup__container_type_edit-profile"); // белая форма заполнения
export const popupFormEditProfile = popupContainerEditProfile.querySelector(".popup__form_edit-profile"); // форма попапа
export const popupFormInputUserName = popupFormEditProfile.querySelector(".popup__form-input_type_name"); // инпут с именем
export const popupFormInputProfession = popupFormEditProfile.querySelector(".popup__form-input_type_profession"); // инпут с профессией

//--------попап добавления карточки-------------------------------------//
export const popupNewMesto = ".popup_type_new-mesto"; //попап с фоном
const popupContainerNewMesto = document.querySelector(".popup__container_type_new-mesto"); //белая форма заполнения
export const popupFormNewMesto = popupContainerNewMesto.querySelector(".popup__form_type_new-mesto"); //форма попапа

//--------попап подтверждения удаления краточки-----------------------//
export const popupTypeConfirm = ".popup_type_confirm";

//---------объект свойства для класса FormValidator--------------------//
export const validationConfig = {
  formSelector: '.popup__form', //форма попапа
  inputSelector: '.popup__form-input', //проверяемые инпуты
  submitButtonSelector: '.popup__form-button-save', //кнопка сохранить
  inactiveButtonClass: 'popup__form-button-save_type_unable', //класс деактивации кнопки сохранить
  inputErrorClass: 'popup__form-input_status-error', //класс изменяет цвет рамки при ошибки валидации
  errorClass: 'popup__input-error' //класс стилизует сообщение ошибки
};

