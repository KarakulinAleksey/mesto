/**
 * @param {number} from
 * @param {number} to
 * @param {number} decimal
 */

const page = document.querySelector(".page");
const content = page.querySelector(".content");
const elementsList = page.querySelector(".elements__list");

const profile = content.querySelector(".profile");
const profileFigure = profile.querySelector(".profile__figure");

//!--------------------------------------------------------------кнопки прифиля-----------------------------------------------------\\
const profileEditButton = profileFigure.querySelector(".profile__edit-button");
const profileAddButton = profile.querySelector(".profile__add-button");

//!--------------------------------------------------------------текст профиля------------------------------------------------------\\
const profileInfo = profileFigure.querySelector(".profile__info");
const profileTitle = profileInfo.querySelector(".profile__title");
const profileText = profileInfo.querySelector(".profile__text");

//!--------------------------------------------------------------попап профиль------------------------------------------------------\\
const popupEditProfile = page.querySelector(".popup_type_edit-profile"); //*попап с фоном
const popupContainerEditProfile = popupEditProfile.querySelector(".popup__container_type_edit-profile"); //* белая форма заполнения

const popupEditProfileButtonExit = popupEditProfile.querySelector( ".popup__form-button-exit"); //* кнопка закрытия попапа
const popupFormEditProfile = popupContainerEditProfile.querySelector(".popup__form_edit-profile"); //* для отправки данных (тег form)

const popupFormInputUserName = popupFormEditProfile.querySelector(".popup__form-input_type_name"); //* инпут с именем
const popupFormInputProfession = popupFormEditProfile.querySelector(".popup__form-input_type_profession"); //* инпут с профессией

//!--------------------------------------------------------------попап новое место--------------------------------------------------\\
const popupNewMesto = page.querySelector(".popup_type_new-mesto"); //*попап с фоном
const popupContainerNewMesto = popupNewMesto.querySelector(".popup__container_type_new-mesto"); //* белая форма заполнения

const popupNewMestoButtonExit = popupContainerNewMesto.querySelector(".popup__form-button-exit"); //* кнопка закрытия попапа
const popupFormNewMesto = popupContainerNewMesto.querySelector(".popup__form_type_new-mesto"); //* для отправки данных (тег form)

const popupFormInputCartName = popupFormNewMesto.querySelector(".popup__form-input_type_cart-name"); //* инпут с именем карты
const popupFormInputCartLink = popupFormNewMesto.querySelector(".popup__form-input_type_cart-link"); //* инпут с ссылкой на изображение

//!--------------------------------------------------------------попап просмотр изображения--------------------------------------------------\\
const popupTypeViewer = page.querySelector(".popup_type_viewer"); //* попап с фоном
const popupContainerTypeViewer = popupTypeViewer.querySelector(".popup__container_type_viewer");
const popupTypeViewerButton = popupTypeViewer.querySelector(".popup__form-button-exit"); //* кнопка закрытия попапа
const popupTypeViewerImage = popupTypeViewer.querySelector(".popup__image"); //* картинка внутри попапа
const elementsImage = elementsList.querySelectorAll(".elements__image"); //* изображение для открытия попапа
const popupCaption = popupTypeViewer.querySelector(".popup__caption"); //* подпись картинки
const cartTitle = elementsList.querySelectorAll(".elements__title") //* название картинки
const arrCartTitle = Array.from(cartTitle);

//?--------------функции попапа профиля---------------\\
function popupEditProfileShow() {
  popupEditProfile.classList.add("popup_show");
  popupFormInputUserName.value = profileTitle.textContent;
  popupFormInputProfession.value = profileText.textContent;
}
function popupEditProfileClose() {
  popupEditProfile.classList.remove("popup_show");
}

//?--------------функции попапа новое место----------------\\
function popupNewMestoShow() {
  popupNewMesto.classList.add("popup_show");
}
function popupNewMestoClose() {
  popupNewMesto.classList.remove("popup_show");
}

//?--------------функции попапа просмотра избражения----------------\\
function popupTypeViewerShow() {
  popupTypeViewer.classList.add("popup_show");
}
function popupTypeViewerClose() {
  popupTypeViewer.classList.remove("popup_show");
}


//?---------------открытие-зактие попапа профиля------------------------------------\\
profileEditButton.addEventListener("click", popupEditProfileShow);
popupEditProfileButtonExit.addEventListener("click",popupEditProfileClose);

popupEditProfile.addEventListener('click', function(evt){   //закрытие попапа при клике за пределами формы
const evtTarget = evt.target;
// console.log(popupFormEditProfile.contains(evtTarget));
if (!popupFormEditProfile.contains(evtTarget)){
  popupEditProfileClose();
}
});


//?---------------открытие-зактие попапа новое место-----------------------------------\\
profileAddButton.addEventListener("click", popupNewMestoShow);
popupNewMestoButtonExit.addEventListener("click", popupNewMestoClose);

popupNewMesto.addEventListener('click', function(evt){   //закрытие попапа при клике за пределами формы
  const evtTarget = evt.target;
  if (!popupFormNewMesto.contains(evtTarget)){
    popupNewMestoClose();
  }
  });

//?----------------------------------открытие - закрытие попапа просмотра изображения  --------------------------------\\
elementsImage.forEach(function(item, index){
  item.addEventListener('click', function(evt){
    const evtTarget = evt.target;

    popupTypeViewerImage.src = evtTarget.src;
    popupCaption.textContent = arrCartTitle[index].textContent;
    popupTypeViewer.classList.add("popup_show");
  });
});
popupTypeViewerButton.addEventListener("click", popupTypeViewerClose);

popupTypeViewer.addEventListener('click', function(evt){   //закрытие попапа при клике за пределами формы
  const evtTarget = evt.target;
  if (!popupContainerTypeViewer.contains(evtTarget)){
    popupTypeViewerClose();
  }
  });

//?--------------отправка формы попапа профиля-----------------------------------\\
popupFormEditProfile.addEventListener("submit", formSubmitHandler);

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupFormInputUserName.value;
  profileText.textContent = popupFormInputProfession.value;
  popupEditProfileClose();
}

//?--------------отправка формы попапа новое место-----------------------------------\\

popupFormNewMesto.addEventListener("submit", formSubmitNewMesto);

function formSubmitNewMesto(evt) {
  evt.preventDefault();

  const cart_temlate = page.querySelector("#cart-template").content;
  const element = cart_temlate.querySelector(".elements__element").cloneNode(true);

  const cartImegeTemp = element.querySelector(".elements__image");
  const cartTitleTemp = element.querySelector(".elements__title");

  cartImegeTemp.src = popupFormInputCartLink.value;
  cartTitleTemp.textContent = popupFormInputCartName.value;

  elementsList.prepend(element);

  //*--------------событие кнопки likee-----------------------------------\\
  const new_like = element.querySelector(".elements__image-likee");
  new_like.addEventListener("click", function (evt) {
    let evtTarget = evt.target;
    evtTarget.classList.toggle("elements__image-like_active");
  });

  //*--------------событие кнопки удаления-----------------------------------\\
  const elementButtonRemove = element.querySelector(".elements__button_remove");
  console.log(elementButtonRemove);
  elementButtonRemove.addEventListener("click", function (evt) {
    let evtTarget = evt.target;
    element.remove();
  });

  //*-----------событие новой картинки-----------------------------\\
  cartImegeTemp.addEventListener("click", function(evt){
    const evtTarget = evt.target;
    popupTypeViewerImage.src = evtTarget.src;
    popupCaption.textContent = cartTitleTemp.textContent;
    console.log (evtTarget);
    evtTarget.classList.toggle("elements__image-like_active");
    popupTypeViewer.classList.add("popup_show");

  });

  popupNewMestoClose();
}

//?--------------------------------------заполняю секцию elements фото и подписью------------------------------------------\\
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const elementsListImage = elementsList.querySelectorAll(".elements__image");
elementsListImage.forEach(function (item, index) {
  item.src = initialCards[index].link;
});
const elementsListTitle = elementsList.querySelectorAll(".elements__title");
elementsListTitle.forEach(function (item, index) {
  item.textContent = initialCards[index].name;
});

//?----------------------------------меняем цвет кнопки Лайк--------------------------------\\
let buttonElementsImageLikee = elementsList.querySelectorAll(
  ".elements__image-likee"
);
console.log(buttonElementsImageLikee);

buttonElementsImageLikee.forEach(function (item) {
  item.addEventListener("click", function (evt) {
    //console.log(buttonElementsImageLikee);
    const evtTarget = evt.target;
    evtTarget.classList.toggle("elements__image-like_active");
  });
});

//?----------------------------------удаляем карточки  --------------------------------\\
let elementButtonRemove = elementsList.querySelectorAll(
  ".elements__button_remove"
);

console.log(elementButtonRemove);

elementButtonRemove.forEach(function (item) {
  item.addEventListener("click", function (evt) {
    const evtTarget = evt.target;
    evtTarget.parentElement.remove();
  });
});


