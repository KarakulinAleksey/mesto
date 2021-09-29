import { initialCards } from "./initial-cards.js";
import { elementsList,/*эллемент для вставки карточек*/
         cartTemlate, /*темплейт карточки*/

         popupTypeViewer, /*попап просмотр изображения*/
         popupContainerTypeViewer, /*форма попапа просмотр изображения*/
         popupTypeViewerButtonExit, /*кнопка закрытия попап просмотр изображения*/
         popupEditProfile, /*попап редактирование профиля с фоном*/
         popupFormEditProfile, /*форма попапа редактирование профиля*/
         popupFormInputUserName, /*инпут с именем попап редактирование профиля*/
         popupFormInputProfession, /*инпут с профессией попап редактирование профиля*/
         popupEditProfileButtonExit, /*кнопка закрытия попапа редактирование профиля*/

         profileTitle, /*эллемент с гл.страницы имя профиля*/
         profileText, /*эллемент с гл.страницы профессия*/
         profileEditButton, /*кнопка редактирование профиля*/
         profileAddButton, /*кнопка добавления карточки*/

         popupNewMesto, /*попап с фоном добавление новой карточки*/
         popupNewMestoButtonExit, /*кнопка закрытия попапа добавление новой карточки*/
         popupFormNewMesto, /*форма попапа добавление новой карточки*/
         popupFormInputCartName, /*инпут с именем картинки*/
         popupFormInputCartLink, /*инпут с ссылкой на изображение*/

         validationConfig /*объект свойства для класса FormValidator*/
        } from "./var.js";
import Card from "./Card.js";
import {showPopup, /*функция открытия попапа*/
        closePopup, /*функция закрытия попапа*/
        setPopupCloseEventListener /*функция закрытия попапа при нажатии на свободное место вне формы*/
       } from "./utils.js";
import FormValidator from "./FormValidator.js";

const formValidatorFormEditProfile = new FormValidator(validationConfig, popupFormEditProfile);
formValidatorFormEditProfile.enableValidation();

const formValidatorFormNewMesto = new FormValidator(validationConfig, popupFormNewMesto);
formValidatorFormNewMesto .enableValidation();

//----------добавить карточки при загрузки страницы---------------\\
initialCards.forEach(function (item) {
  elementsList.prepend(createCard(item, cartTemlate));
});

//------------открытие попапа редактирования профиля---------------------//
profileEditButton.addEventListener("click", function(){
  showPopup(popupEditProfile);
  formValidatorFormEditProfile.resetValidation();
  popupFormInputUserName.value = profileTitle.textContent;
  popupFormInputProfession.value = profileText.textContent;
});
//------------открыть попап добавление карточки----------------------------//
profileAddButton.addEventListener("click", function(){
  formValidatorFormNewMesto.resetValidation();
  showPopup(popupNewMesto)
});

//------------закрыть попапа просмотра изображения при нажатии на кнопку "крестик"----------\\
popupTypeViewerButtonExit.addEventListener("click", function(){closePopup(popupTypeViewer)});
//------------закрыть попапа редактирование профиля при нажатии на кнопку "крестик"----------\\
popupEditProfileButtonExit.addEventListener("click", function(){closePopup(popupEditProfile)});
//------------закрыть попапа добавлеия новой карточки при нажатии на кнопку "крестик"----------\\
popupNewMestoButtonExit.addEventListener("click", function(){closePopup(popupNewMesto)});

//--------закрыть попапа просмотра изображения при нажатии на свободное место вне формы------\\
setPopupCloseEventListener(popupTypeViewer,popupContainerTypeViewer);
//--------закрыть попапа редактирование профиля при нажатии на свободное место вне формы------\\
setPopupCloseEventListener(popupEditProfile,popupFormEditProfile);
//--------закрыть попапа добавления новой карточки при нажатии на свободное место вне формы------\\
setPopupCloseEventListener(popupNewMesto,popupFormNewMesto);

//---------отправить форму попап редактирования профиля----------//
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupFormInputUserName.value;
  profileText.textContent = popupFormInputProfession.value;
  closePopup(popupEditProfile);
}
popupFormEditProfile.addEventListener("submit", formSubmitHandler);

//---------отправить форму попап добавления новой карточки----------//
function formSubmitNewMesto(evt) {
  evt.preventDefault();
  const cardValue = {
    name: popupFormInputCartName.value,
    link: popupFormInputCartLink.value,
  }
  elementsList.prepend(createCard(cardValue, cartTemlate));
  evt.target.reset();
  closePopup(popupNewMesto);
}
popupFormNewMesto.addEventListener("submit", formSubmitNewMesto);


function createCard(item, cartTemlate){
  const card = new Card(item, cartTemlate);
  return card.generateCard();
}
