let page = document.querySelector(".page");
let content = page.querySelector(".content");

let profile = content.querySelector(".profile");
let profileFigure = profile.querySelector(".profile__figure");
let profileEditButton = profileFigure.querySelector(".profile__edit-button");
// let profileAddButton = profile.querySelector(".profile__add-button");
let profileInfo = profileFigure.querySelector(".profile__info");
let profileTitle = profileInfo.querySelector(".profile__title");
let profileText = profileInfo.querySelector(".profile__text");

let popup = page.querySelector(".popup");
let popupContainer =popup.querySelector(".popup__container");
let popupFormButtonExit = popup.querySelector(".popup__form-button-exit");
let popupForm = popupContainer.querySelector(".popup__form");
let popupFormInputUserName = popupForm.querySelector(
  ".popup__form-input_type_name"
);
let popupFormInputProfession = popupForm.querySelector(
  ".popup__form-input_type_profession"
);
// let popupFormButtonSave = popupForm.querySelector(".popup__form-button-save");

function popupShow() {
  popup.classList.add("popup_show");
  // popupFormInputUserName.value="";
  // popupFormInputProfession.value="";
  // popupFormInputUserName.placeholder = profileTitle.textContent;
  // popupFormInputProfession.placeholder = profileText.textContent;
  popupFormInputUserName.value = profileTitle.textContent;
  popupFormInputProfession.value = profileText.textContent;
}
function popupClose() {
  popup.classList.remove("popup_show");
}
profileEditButton.addEventListener("click", popupShow);
popupFormButtonExit.addEventListener("click", popupClose);

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileTitle.textContent = popupFormInputUserName.value;
  profileText.textContent = popupFormInputProfession.value;
  popupClose();

}

popupForm.addEventListener('submit', formSubmitHandler);


//-----------------заполняю секцию elements фото и подписью------------------------------------
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
console.log(elementsList);

const elementsListImage = elementsList.querySelectorAll(".elements__image");
//console.log(elementsListImage);

elementsListImage.forEach(function(item, index) {
  item.src = initialCards[index].link;
});

const elementsListTitle = elementsList.querySelectorAll(".elements__title");
//console.log(elementsListTitle);

elementsListTitle.forEach(function(item, index){
  item.textContent = initialCards[index].name;
});

//--------------меняем цвет кнопки Лайк--------------------------------

const buttonElementsImageLikee = elementsList.querySelectorAll('.elements__image-likee');
//console.log(buttonElementsImageLikee);
buttonElementsImageLikee.forEach(function(item){
  item.addEventListener('click', function(evt){
  console.log(evt);
  const evtTarget = evt.target;
  evtTarget.classList.toggle('elements__image-like_active');
})
})

