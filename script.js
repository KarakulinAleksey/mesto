let page = document.querySelector(".page");
let content = page.querySelector(".content");

let profile = content.querySelector(".profile");
let profileFigure = profile.querySelector(".profile__figure");
let profileEditButton = profileFigure.querySelector(".profile__edit-button");
let profileAddButton = profile.querySelector(".profile__add-button");
let profileInfo = profileFigure.querySelector(".profile__info");
let profileTitle = profileInfo.querySelector(".profile__title");
let profileText = profileInfo.querySelector(".profile__text");

let popup = page.querySelector(".popup");
let popupForm = popup.querySelector(".popup__form");
let popupFormButtonExit = popupForm.querySelector(".popup__form-button-exit");
let popupFormInputUserName = popupForm.querySelector(
  ".popup__form-input-user-name"
);
let popupFormInputProfession = popupForm.querySelector(
  ".popup__form-input-profession"
);
let popupFormButtonSave = popupForm.querySelector(".popup__form-button-save");

// function popupFormInputUserNameTextDelet() {
//   popupFormInputUserName.value = "";
// }
// function popupFormInputProfessionTextDelet() {
//   popupFormInputProfession.value = "";
// }
// popupFormInputUserName.addEventListener(
//   "click",
//   popupFormInputUserNameTextDelet
// );
// popupFormInputProfession.addEventListener(
//   "click",
//   popupFormInputProfessionTextDelet
// );

function popupShow() {
  popup.classList.add("popup_show");
}
function popupClose() {
  popup.classList.remove("popup_show");
}
profileEditButton.addEventListener("click", popupShow);
popupFormButtonExit.addEventListener("click", popupClose);

function profileTitleEdit() {
  if (
    popupFormInputUserName.value !== "" ||
    popupFormInputProfession.value !== ""
  ) {
    profileTitle.textContent = popupFormInputUserName.value;
    profileText.textContent = popupFormInputProfession.value;
    popupClose();
  } else {
    alert("Заполните хотя-бы одно поле!");
  }
}
popupFormButtonSave.addEventListener("click", profileTitleEdit);
