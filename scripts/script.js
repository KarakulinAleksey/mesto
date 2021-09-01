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


//?--------------функции открытия-закрытия---------------\\
function popupShow(popup) {
  popup.classList.add("popup_show");
}
function popupClose (popup){
  popup.classList.remove("popup_show");
}


//?---------------открытие-зактие попапа профиля------------------------------------\\
profileEditButton.addEventListener("click", function(){popupShow(popupEditProfile)});
popupEditProfileButtonExit.addEventListener("click", function(){popupClose(popupEditProfile)});

popupEditProfile.addEventListener('click', function(evt){   //закрытие попапа при клике за пределами формы
  const evtTarget = evt.target;
  // @ts-ignore
  if (!popupFormEditProfile.contains(evtTarget)){
    popupClose(popupEditProfile);
  }
});


//?---------------открытие-зактие попапа новое место-----------------------------------\\
profileAddButton.addEventListener("click", function(){popupShow(popupNewMesto)});
popupNewMestoButtonExit.addEventListener("click", function(){popupClose(popupNewMesto)});

popupNewMesto.addEventListener('click', function(evt){   //закрытие попапа при клике за пределами формы
  const evtTarget = evt.target;
  // @ts-ignore
  if (!popupFormNewMesto.contains(evtTarget)){
    popupClose(popupNewMesto);
  }
});


//?----------------------------------открытие-закрытие попапа просмотра изображения  --------------------------------\\
elementsImage.forEach(function(item, index){
  item.addEventListener('click', function(evt){
    const evtTarget = evt.target;
    popupTypeViewerImage.src = evtTarget.src;
    popupCaption.textContent = arrCartTitle[index].textContent;
    popupShow(popupTypeViewer);
  });
});
popupTypeViewerButton.addEventListener("click", function(){popupClose(popupTypeViewer)});

popupTypeViewer.addEventListener('click', function(evt){   //закрытие попапа при клике за пределами формы
  const evtTarget = evt.target;
  // @ts-ignore
  if (!popupContainerTypeViewer.contains(evtTarget)){
    popupClose(popupTypeViewer);
  }
});


//?--------------отправка формы попапа профиля-----------------------------------\\
popupFormEditProfile.addEventListener("submit", formSubmitHandler);

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupFormInputUserName.value;
  profileText.textContent = popupFormInputProfession.value;
  popupFormInputUserName.value = profileTitle.textContent;
  popupFormInputProfession.value = profileText.textContent;
  popupClose(popupEditProfile);
}

//?--------------отправка формы попапа новое место-----------------------------------\\
popupFormNewMesto.addEventListener("submit", formSubmitNewMesto);

function createCart(name, link){
  const cartTemlate = page.querySelector("#cart-template").content;
  const element = cartTemlate.querySelector(".elements__element").cloneNode(true);
  const cartImegeTemp = element.querySelector(".elements__image");
  const cartTitleTemp = element.querySelector(".elements__title");

  cartImegeTemp.src = link;
  cartImegeTemp.alt = name;
  cartTitleTemp.textContent = name;

  //*--------------добавление событие кнопки likee-----------------------------------\\
  const newLike = element.querySelector(".elements__image-likee");
  newLike.addEventListener("click", function (evt) {
    let evtTarget = evt.target;
    evtTarget.classList.toggle("elements__image-like_active");
  });

  //*--------------добавление событие кнопки удаления-----------------------------------\\
  const elementButtonRemove = element.querySelector(".elements__button-remove");
  elementButtonRemove.addEventListener("click", function (evt) {
    element.remove();
  });

  //*-----------добавление событие новой картинки-----------------------------\\
  cartImegeTemp.addEventListener("click", function(evt){
    const evtTarget = evt.target;
    popupTypeViewerImage.src = evtTarget.src;
    popupCaption.textContent = cartTitleTemp.textContent;
    evtTarget.classList.toggle("elements__image-like_active");
    popupShow(popupTypeViewer);
  });

  return element;
}

function formSubmitNewMesto(evt) {
  evt.preventDefault();
  let cartLink = popupFormInputCartLink.value;
  let cartName = popupFormInputCartName.value;

  let newCart = createCart(cartName, cartLink);

  elementsList.prepend(newCart);

  popupFormInputCartLink.value = "";
  popupFormInputCartName.value = "";
  popupClose(popupNewMesto);
}

//?--------------------------------------заполняю секцию elements карточками------------------------------------------\\
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
  }
];

for(let i = 0; i < initialCards.length; i++){
  const newCart = createCart(initialCards[i].name, initialCards[i].link);
  elementsList.prepend(newCart);
}



