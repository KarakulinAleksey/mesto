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
  validationConfig /*объект свойства для класса FormValidator*/

} from "../utils/var.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";


//---------------валидация формы редактирования данных пользователя-------//
// console.log(validationConfig);
// console.log(popupFormEditProfile);
const formValidatorFormEditProfile = new FormValidator(
  validationConfig,
  popupFormEditProfile
);
formValidatorFormEditProfile.enableValidation();

//----------------валидация формы добавления новой карточки-----------//
// console.log(popupFormNewMesto);
const formValidatorFormNewMesto = new FormValidator(
  validationConfig,
  popupFormNewMesto
);
formValidatorFormNewMesto.enableValidation();

//-----------------валидация формы редактирования аватара----------//
// console.log(popupFormUpdateAvatar);
const formValidatorFormUpdateAvatar = new FormValidator(
  validationConfig,
  popupFormUpdateAvatar
);
formValidatorFormUpdateAvatar.enableValidation();

//-----------класс для взаимодействия с сервером------------//
const api = new Api()



//---------открыть попап подтверждения удаления карточки---------удалить//
const popupWithSubmit = new PopupWithSubmit({
    popupSelector: popupTypeConfirm,
    deleteCard: (val, element) => {
     const delCard = api.deleteCard(val);
     delCard
       .then((data) => {
         element.remove();
       })
       .catch((err) => {
         console.log('Удаление карты ' + err);
       })
    },
})
popupWithSubmit.setEventListeners();


//---------отправить форму попап редактирования аватара профиля----------//
const submitPopupUpdateAvatar = new PopupWithForm({
  popupSelector: popupTypeUpdateAvatar,
  handleFormSubmit: (formData) => {
    const editAvatar = api.editAvatar(formData.link);
    editAvatar
      .then((data) => {
        // console.log(data.avatar);
        imageUserInfo.src = data.avatar;
        imageUserInfo.alt = data.name;
    })
      .catch((err) => {
        console.log(err);
      })
      },
});
submitPopupUpdateAvatar.setEventListeners();

//------------открытие попап редактирования аватара---------------------//
profileAvatar.addEventListener("click", () => {
  submitPopupUpdateAvatar.open();
  formValidatorFormUpdateAvatar.resetValidation();
});

/*//----------загружаем информацию о пользователе в инпуты попапа с гл.страницы----------//
const prependUserInfoInInputs = () => {
  const getUser = userInfo.getUserInfo();
  // @ts-ignore
  popupFormInputUserName.value = getUser.name;
  // @ts-ignore
  popupFormInputProfession.value = getUser.profession;
}*/

const userInfo = new UserInfo(profileTitle, profileText);

//----------загружаем информацию о пользователе при загрузке страницы ГЛАВНАЯ-----//
const imageUserInfo = document.querySelector('.profile__avatar');
const getUserInfoData = api.getUserInfo();


getUserInfoData
  .then((data) => {
//---------загружаем информацию о пользователе при загрузке страницы-----api//
      profileTitle.textContent = data.name;
      profileText.textContent = data.about;
      imageUserInfo.src = data.avatar;
      imageUserInfo.alt = data.name;

//----------загружаем информацию о пользователе в инпуты попапа с гл.страницы----------api//
      const prependUserInfoInInputs = () => {
        const getUser = userInfo.getUserInfo();
        popupFormInputUserName.value = getUser.name;
        popupFormInputProfession.value = getUser.profession;
      }
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
              }
              ,handleLikeClick:(cardId, elem, isLike) => {
                const likeCard = api.likeCard(cardId, isLike);
                likeCard
                  .then((data) => {
                    elem.textContent = data.likes.length;
                  })
                  .catch((err) => {
                    console.log(err);
                  })
              }
            },
            cartTemlate,
            data._id
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
//----------запрос с сервера всех карточек------------//
        const cards = api.getAllCards();
          cards
            .then((data) => {
              cardList.renderItems(data);
            })
            .catch((err) => {
              console.log('Запрос с сервера всех карточек' + err);
            })
//---------отправить форму попап редактирования профиля----------//
      const submitPopupEditProfile = new PopupWithForm({
        popupSelector: popupEditProfile,
        handleFormSubmit: (formData) => {
          const editUserInfo = api.editUserInfo(formData.name, formData.profession);
          editUserInfo
            .then((data) => {
              userInfo.setUserInfo({ infoOdject: data })
          })
            .catch((err) => {
              console.log('Редактирование профиля' + err);
            })
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
            })
            .catch((err) => {
              console.log('Добавления новой карточки' + err);
            })
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
      console.log('Запрос данных пользователя при загрузе страницы ' + err);
})

