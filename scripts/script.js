/**
 * @param {number} from
 * @param {number} to
 * @param {number} decimal
 */


let page = document.querySelector(".page");
let content = page.querySelector(".content");
let elements_list = page.querySelector(".elements__list");

let profile = content.querySelector(".profile");
let profileFigure = profile.querySelector(".profile__figure");

//!--------------------------------------------------------------кнопки прифиля-----------------------------------------------------\\
let profileEditButton = profileFigure.querySelector(".profile__edit-button");
let profileAddButton = profile.querySelector(".profile__add-button");

//!--------------------------------------------------------------текст профиля------------------------------------------------------\\
let profileInfo = profileFigure.querySelector(".profile__info");
let profileTitle = profileInfo.querySelector(".profile__title");
let profileText = profileInfo.querySelector(".profile__text");

//!--------------------------------------------------------------попап профиль------------------------------------------------------\\
let popupEditProfile = page.querySelector(".popup_edit-profile");
let popupContainerEditProfile = popupEditProfile.querySelector(".popup__container_edit-profile");

let popup_edit_profile_button_exit = popupEditProfile.querySelector(".popup_edit-profile-button-exit");
let popupFormEditProfile = popupContainerEditProfile.querySelector(".popup__form_edit-profile");

let popupFormInputUserName = popupFormEditProfile.querySelector(".popup__form-input_type_name");
let popupFormInputProfession = popupFormEditProfile.querySelector(".popup__form-input_type_profession");

//!--------------------------------------------------------------попап новое место--------------------------------------------------\\
let popupNewMesto = page.querySelector(".popup_new-mesto");
let popupContainerNewMesto = popupNewMesto.querySelector(".popup__container_new-mesto");

let popupNewMestoButton_Exit = popupContainerNewMesto.querySelector(".popup_new-mesto__form-button-exit");
let popupFormNewMesto = popupContainerNewMesto.querySelector(".popup__form_new-mesto");

let popupFormInputCartName = popupFormNewMesto.querySelector(".popup__form-input-cart-name");
let popupFormInputCartLink = popupFormNewMesto.querySelector(".popup__form-input-cart-link");

//?--------------функции попапа профиля---------------\\
function popup_edit_profile_Show() {
  popupEditProfile.classList.add("popup_show");
  popupFormInputUserName.value = profileTitle.textContent;
  popupFormInputProfession.value = profileText.textContent;
}
function popup_edit_profile_Close() {
  popupEditProfile.classList.remove("popup_show");
}

//?--------------функции попапа новое место----------------\\
function popup_new_mesto_Show() {
  popupNewMesto.classList.add("popup_show");
}
function popup_new_mesto_Close() {
  popupNewMesto.classList.remove("popup_show");
}


//?---------------открытие-зактие попапа профиля------------------------------------\\
profileEditButton.addEventListener("click", popup_edit_profile_Show);
popup_edit_profile_button_exit.addEventListener("click", popup_edit_profile_Close);

//?---------------открытие-зактие попапа новое место-----------------------------------\\
profileAddButton.addEventListener("click", popup_new_mesto_Show);
popupNewMestoButton_Exit.addEventListener("click", popup_new_mesto_Close);


//?--------------отправка формы попапа профиля-----------------------------------\\
popupFormEditProfile.addEventListener('submit', formSubmitHandler);

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupFormInputUserName.value;
  profileText.textContent = popupFormInputProfession.value;
  popup_edit_profile_Close();

}

//?--------------отправка формы попапа новое место-----------------------------------\\


popupFormNewMesto.addEventListener('submit', formSubmitNewMesto);

function formSubmitNewMesto(evt) {
  evt.preventDefault();

  let cart_temlate = page.querySelector("#cart-template").content;
  let elements = cart_temlate.querySelector('#elements__element').cloneNode(true);

  elements.querySelector('.elements__image').src = popupFormInputCartLink.value;
  elements.querySelector('.elements__title').textContent = popupFormInputCartName.value;
  popupFormInputCartLink.remove();

  elements_list.prepend(elements);

  let new_like = elements.querySelector(".elements__image-likee").addEventListener('click', function (evt) {
    let evtTarget = evt.target;
    evtTarget.classList.toggle('elements__image-like_active');

  });

  popup_new_mesto_Close();

  //todo name: 'Байкал',
  //todo link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'

}

//?--------------------------------------заполняю секцию elements фото и подписью------------------------------------------\\
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const elementsList = content.querySelector(".elements__list");
const elementsListImage = elementsList.querySelectorAll(".elements__image");
elementsListImage.forEach(function (item, index) {
  item.src = initialCards[index].link;
});
const elementsListTitle = elementsList.querySelectorAll(".elements__title");
elementsListTitle.forEach(function (item, index) {
  item.textContent = initialCards[index].name;
});


//?----------------------------------меняем цвет кнопки Лайк--------------------------------\\
let buttonElementsImageLikee = elementsList.querySelectorAll('.elements__image-likee');
console.log(buttonElementsImageLikee);

buttonElementsImageLikee.forEach(function (item) {
  item.addEventListener('click', function (evt) {
    console.log(buttonElementsImageLikee);
    const evtTarget = evt.target;
    evtTarget.classList.toggle('elements__image-like_active');

  })
});
