import './index.css';
import { initialCards } from "../utils/initial-cards.js";
import {
  elementsList /*эллемент для вставки карточек*/,
  cartTemlate /*темплейт карточки*/,
  popupTypeViewer /*попап просмотр изображения*/,
  popupEditProfile /*попап редактирование профиля с фоном*/,
  popupFormEditProfile /*форма попапа редактирование профиля*/,
  popupFormInputUserName /*инпут с именем попап редактирование профиля*/,
  popupFormInputProfession /*инпут с профессией попап редактирование профиля*/,
  profileTitle /*эллемент с гл.страницы имя профиля*/,
  profileText /*эллемент с гл.страницы профессия*/,
  profileEditButton /*кнопка редактирование профиля*/,
  profileAddButton /*кнопка добавления карточки*/,
  popupNewMesto /*попап с фоном добавление новой карточки*/,
  popupFormNewMesto /*форма попапа добавление новой карточки*/,
  validationConfig /*объект свойства для класса FormValidator*/,
} from "../utils/var.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const formValidatorFormEditProfile = new FormValidator(
  validationConfig,
  popupFormEditProfile
);
formValidatorFormEditProfile.enableValidation();

const formValidatorFormNewMesto = new FormValidator(
  validationConfig,
  popupFormNewMesto
);
formValidatorFormNewMesto.enableValidation();

//----------добавить карточки при загрузки страницы---------------\\
const popupWithImage = new PopupWithImage(popupTypeViewer);
popupWithImage.setEventListeners();

const createCard = (item) => {
  const card = new Card(
    {
      data: item,
      handleCardClick: (link, name) => {
        popupWithImage.open(link, name);
      },
    },
    cartTemlate
  );
  const cardElement = card.generateCard();
  return cardElement;
}


const cardList = new Section(
  {
    render: (item) => {
      const cardElement = createCard(item);
      cardList.setItem(cardElement);
    },
  },
  elementsList
);

cardList.renderItems(initialCards);



const userInfo = new UserInfo(profileTitle, profileText);

const prependUserInfoInInputs = () => {
  const getUser = userInfo.getUserInfo();
  // @ts-ignore
  popupFormInputUserName.value = getUser.name;
  // @ts-ignore
  popupFormInputProfession.value = getUser.profession;
}

//---------отправить форму попап редактирования профиля----------//
const submitPopupEditProfile = new PopupWithForm({
  popupSelector: popupEditProfile,
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo({ infoOdject: formData });
  },
});
submitPopupEditProfile.setEventListeners();

//------------открытие попапа редактирования профиля---------------------//
profileEditButton.addEventListener("click", () => {
  prependUserInfoInInputs();
  submitPopupEditProfile.open();
  formValidatorFormEditProfile.resetValidation();
});

//---------отправить форму попап добавления новой карточки----------//
const submitPopupNewMesto = new PopupWithForm({
  popupSelector: popupNewMesto,
  handleFormSubmit: (formData) => {
    cardList.renderItems(formData);
  },
});
submitPopupNewMesto.setEventListeners();

//------------открыть попап добавление карточки----------------------------//
profileAddButton.addEventListener("click", () => {
  formValidatorFormNewMesto.resetValidation();

  submitPopupNewMesto.open();
});
