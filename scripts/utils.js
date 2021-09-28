//-------------функция закрытие попапа при нажатии кнопки ESC--------------------//
function handleESC(evt) {
  if (evt.key == "Escape") {
    closePopup (document.querySelector('.popup_show'));
  };
}
//-------------функция открытия попапа "картинка"-----------------//
export function showPopup(popup) {
  popup.classList.add("popup_show");
  document.addEventListener('keydown', handleESC);
}
//-------------функция закрытия попапа "картинка"-----------------//
export function closePopup (popup){
  popup.classList.remove("popup_show");
  document.removeEventListener('keydown', handleESC);
}

//----------------функция закрытия попапа при нажатии за пределами формы попапа-------\\
export function setPopupCloseEventListener(namePopup, formPopup){
  namePopup.addEventListener('click', function(evt){
    const evtTarget = evt.target;
    if (!formPopup.contains(evtTarget)){
      closePopup(namePopup);
    }
  });
}

