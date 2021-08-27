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
 let popupEditProfile = page.querySelector(".popup_edit-profile"); //*попап с фоном
 let popupContainerEditProfile = popupEditProfile.querySelector(".popup__container_edit-profile"); //* белая форма заполнения

 let popup_edit_profile_button_exit = popupEditProfile.querySelector(".popup_edit-profile-button-exit"); //* кнопка закрытия попапа
 let popupFormEditProfile = popupContainerEditProfile.querySelector(".popup__form_edit-profile"); //* для отправки данных (тег form)

 let popupFormInputUserName = popupFormEditProfile.querySelector(".popup__form-input_type_name"); //* инпут с именем
 let popupFormInputProfession = popupFormEditProfile.querySelector(".popup__form-input_type_profession"); //* инпут с профессией

 //!--------------------------------------------------------------попап новое место--------------------------------------------------\\
 let popupNewMesto = page.querySelector(".popup_new-mesto"); //*попап с фоном
 let popupContainerNewMesto = popupNewMesto.querySelector(".popup__container_new-mesto"); //* белая форма заполнения

 let popupNewMestoButton_Exit = popupContainerNewMesto.querySelector(".popup_new-mesto__form-button-exit"); //* кнопка закрытия попапа
 let popupFormNewMesto = popupContainerNewMesto.querySelector(".popup__form_new-mesto"); //* для отправки данных (тег form)

 let popupFormInputCartName = popupFormNewMesto.querySelector(".popup__form-input-cart-name"); //* инпут с именем карты
 let popupFormInputCartLink = popupFormNewMesto.querySelector(".popup__form-input-cart-link"); //* инпут с ссылкой на изображение

 //!--------------------------------------------------------------элементы карточки--------------------------------------------------\\
 // let elements_temp = page.querySelector("#cart-template").content; //* избражение карточки
 // let cart_image = elements_temp.querySelector(".elements__image"); //* избражение карточки
 // let cart_title = elements_temp.querySelector(".elements__title"); //* имя карточки



 //*--------------функции попапа профиля---------------\\
 function popup_edit_profile_Show() {
   popupEditProfile.classList.add("popup_show");
   popupFormInputUserName.value = profileTitle.textContent;
   popupFormInputProfession.value = profileText.textContent;
 }
 function popup_edit_profile_Close() {
   popupEditProfile.classList.remove("popup_show");
 }

 //*--------------функции попапа новое место----------------\\
 function popup_new_mesto_Show() {
   popupNewMesto.classList.add("popup_show");
 }
 function popup_new_mesto_Close() {
   popupNewMesto.classList.remove("popup_show");
 }


 //*---------------открытие-зактие попапа профиля------------------------------------\\
 profileEditButton.addEventListener("click", popup_edit_profile_Show);
 popup_edit_profile_button_exit.addEventListener("click", popup_edit_profile_Close);

 //*---------------открытие-зактие попапа новое место-----------------------------------\\
 profileAddButton.addEventListener("click", popup_new_mesto_Show);
 popupNewMestoButton_Exit.addEventListener("click", popup_new_mesto_Close);


 //*--------------отправка формы попапа профиля-----------------------------------\\
 popupFormEditProfile.addEventListener('submit', formSubmitHandler);

 function formSubmitHandler (evt) {
   evt.preventDefault();
   profileTitle.textContent = popupFormInputUserName.value;
   profileText.textContent = popupFormInputProfession.value;
   popup_edit_profile_Close();

 }

 //*--------------отправка формы попапа новое место-----------------------------------\\
 popupFormNewMesto.addEventListener('submit', formSubmitNewMesto);

 function formSubmitNewMesto (evt) {
   evt.preventDefault();

   let cart_temlate = page.querySelector("#cart-template").content; //* создаю объект из темплейт карточки
   let elements = cart_temlate.querySelector('#elements__element').cloneNode(true); //*клоникую темплейт в обычный объект

   elements.querySelector('.elements__image').src = popupFormInputCartLink.value; //* копирую из поля ввода ссылку в атрибут scr изображения
   elements.querySelector('.elements__title').textContent = popupFormInputCartName.value; //* копирую из поля ввода название карточки elements__title

   popupFormInputCartLink.value = "";
   popupFormInputCartName.value = "";

   elements_list.prepend(elements); //*вставляю объект в секцию карточек
   popup_new_mesto_Close();
 }

 //? https://traveltimes.ru/wp-content/uploads/2021/05/Kareliya-5.jpg - Карелия
 //?  https://avatars.mds.yandex.net/get-zen_doc/1926321/pub_5cace7cb0c7b5200af216891_5cae2122a88be900b96498e0/scale_1200 - Тайлант

 //-----------------заполняю секцию elements фото и подписью------------------------------------\\
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


 elementsListImage.forEach(function(item, index) {
   item.src = initialCards[index].link;
 });

 const elementsListTitle = elementsList.querySelectorAll(".elements__title");


 elementsListTitle.forEach(function(item, index){
   item.textContent = initialCards[index].name;
 });


 //*--------------меняем цвет кнопки Лайк--------------------------------

 const buttonElementsImageLikee = elementsList.querySelectorAll('.elements__image-likee');
 //console.log(buttonElementsImageLikee);
 buttonElementsImageLikee.forEach(function(item){
   item.addEventListener('click', function(evt){
   console.log(evt);
   const evtTarget = evt.target;
   evtTarget.classList.toggle('elements__image-like_active');
 })
 })
