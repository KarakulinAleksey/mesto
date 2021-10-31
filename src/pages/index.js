import './index.css';

import {
  elementsList /*эллемент для вставки карточек*/,
  cartTemlate /*темплейт карточки*/,
  popupTypeViewer /*попап просмотр изображения*/,
  popupEditProfile /*попап редактирование профиля с фоном*/,
  popupFormEditProfile /*форма попапа редактирование профиля*/,
  popupTypeConfirm /*попап подтверждения удаления карточки*/,
  popupTypeUpdateAvatar /*попап редактирования аватара*/,
  popupFormUpdateAvatar /*форма попапа редактирования аватара*/,
  popupFormInputUserName /*инпут с именем попап редактирование профиля*/,
  popupFormInputProfession /*инпут с профессией попап редактирование профиля*/,
  profileTitle /*эллемент с гл.страницы имя профиля*/,
  profileText /*эллемент с гл.страницы профессия*/,
  profileAvatar /*аватар*/,
  profileEditButton /*кнопка редактирование профиля*/,
  profileAddButton /*кнопка добавления карточки*/,
  popupNewMesto /*попап с фоном добавление новой карточки*/,
  popupFormNewMesto /*форма попапа добавление новой карточки*/,
  validationConfig /*объект свойства для класса FormValidator*/,
  imageUserInfo,
} from "../utils/var.js";

const imageLikee = cartTemlate.querySelector(".elements__image-likee");
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

const userInfo = new UserInfo(profileTitle, profileText, imageUserInfo);

//---------------валидация формы редактирования данных пользователя-------//
const formValidatorFormEditProfile = new FormValidator(
  validationConfig,
  popupFormEditProfile
);
formValidatorFormEditProfile.enableValidation();

//----------------валидация формы добавления новой карточки-----------//
const formValidatorFormNewMesto = new FormValidator(
  validationConfig,
  popupFormNewMesto
);
formValidatorFormNewMesto.enableValidation();

//-----------------валидация формы редактирования аватара----------//
const formValidatorFormUpdateAvatar = new FormValidator(
  validationConfig,
  popupFormUpdateAvatar
);
formValidatorFormUpdateAvatar.enableValidation();

//-----------класс для взаимодействия с сервером------------//
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-29",
  headers: {
    authorization: "76bc0008-f467-484c-9d7d-ba27b504e337",
    "Content-Type": "application/json",
  },
});

//---------открыть попап подтверждения удаления карточки---------//
const popupWithSubmit = new PopupWithSubmit({
  popupSelector: popupTypeConfirm,
  deleteCard: (val, element) => {
    const delCard = api.deleteCard(val);
    delCard
      .then((data) => {
        element.remove();
        popupWithSubmit.close();
      })
      .catch((err) => {
        console.log("Удаление карты " + err);
      });
  },
});
popupWithSubmit.setEventListeners();

//---------отправить форму попап редактирования аватара профиля----------//
const submitPopupUpdateAvatar = new PopupWithForm({
  popupSelector: popupTypeUpdateAvatar,
  handleFormSubmit: (formData) => {
    const editAvatar = api.editAvatar(formData.link);
    editAvatar
      .then((data) => {
        userInfo.setAvatar(data.avatar, data.name);
        submitPopupUpdateAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        submitPopupUpdateAvatar.renderLoading(false);
      });
  },
});
submitPopupUpdateAvatar.setEventListeners();

//------------открытие попап редактирования аватара---------------------//
profileAvatar.addEventListener("click", () => {
  submitPopupUpdateAvatar.open();
  formValidatorFormUpdateAvatar.resetValidation();
});

//----------загружаем информацию о пользователе при загрузке страницы ГЛАВНАЯ-----//
const getUserInfoData = api.getUserInfo();

getUserInfoData
  .then((data) => {
    //---------загружаем информацию о пользователе при загрузке страницы-----api//
    userInfo.setUserInfo({ infoOdject: data });
    userInfo.setAvatar(data.avatar, data.name);

    //----------загружаем информацию о пользователе в инпуты попапа с гл.страницы----------api//
    const prependUserInfoInInputs = () => {
      const getUser = userInfo.getUserInfo();
      popupFormInputUserName.value = getUser.name;
      popupFormInputProfession.value = getUser.profession;
    };
    //----------добавить карточки при загрузки страницы---------------api\\
    const popupWithImage = new PopupWithImage(popupTypeViewer);
    popupWithImage.setEventListeners();

    const createCard = (item) => {
      const card = new Card(
        {
          data: item,
          handleCardClick: (link, name) => {
            popupWithImage.open(link, name);
          },
          handleDeleteIconClick: (cardId, element) => {
            popupWithSubmit.open();
            popupWithSubmit.setVal(cardId, element);
          },
          handleLikeClick: (buttonLikee, cardId, elem, isLike) => {
            const likeCard = api.likeCard(cardId, isLike);
            likeCard
              .then((data) => {
                elem.textContent = data.likes.length;
                buttonLikee.classList.toggle("elements__image-like_active");
              })
              .catch((err) => {
                console.log(err);
              });
          },
        },
        cartTemlate,
        data._id
      );

      card.setLikeLoadPage(item.likes);
      const cardElement = card.generateCard();
      return cardElement;
    };

    const cardList = new Section(
      {
        render: (item) => {
          const cardElement = createCard(item);
          cardList.setItem(cardElement);
        },
      },
      elementsList
    );
    //----------запрос с сервера всех карточек------------//
    const cards = api.getAllCards();
    cards
      .then((data) => {
        cardList.renderItems(data);
      })
      .catch((err) => {
        console.log("Запрос с сервера всех карточек" + err);
      });
    //---------отправить форму попап редактирования профиля----------//
    const submitPopupEditProfile = new PopupWithForm({
      popupSelector: popupEditProfile,
      handleFormSubmit: (formData) => {
        const editUserInfo = api.editUserInfo(
          formData.name,
          formData.profession
        );
        editUserInfo
          .then((data) => {
            userInfo.setUserInfo({ infoOdject: data });
            submitPopupEditProfile.close();
          })
          .catch((err) => {
            console.log("Редактирование профиля" + err);
          })
          .finally(() => {
            submitPopupEditProfile.renderLoading(false);
          });
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
        const addCard = api.addCard(formData.name, formData.link);
        addCard
          .then((data) => {
            cardList.renderItems(data);
            submitPopupNewMesto.close();
          })
          .catch((err) => {
            console.log("Добавления новой карточки" + err);
          })
          .finally(() => {
            submitPopupNewMesto.renderLoading(false);
          });
      },
    });
    submitPopupNewMesto.setEventListeners();
    //------------открыть попап добавление карточки----------------------------//
    profileAddButton.addEventListener("click", () => {
      formValidatorFormNewMesto.resetValidation();
      submitPopupNewMesto.open();
    });
  })

  .catch((err) => {
    console.log("Запрос данных пользователя при загрузе страницы " + err);
  });
