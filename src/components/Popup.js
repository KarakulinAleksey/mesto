
export default class Popup{
  constructor(popupSelector){
      this._popupSelector = popupSelector;
      this._popupButtonExit = this._popupSelector.querySelector('.popup__form-button-exit');
      this._popupContainer = this._popupSelector.querySelector('.popup__container');
  }

  open(){
      this._popupSelector.classList.add('popup_show');
      document.addEventListener('keydown', this._handleEscClose);
  }

  close(){
      this._popupSelector.classList.remove('popup_show');
      document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose = (evt) => {
      if (evt.key == "Escape") {
          this.close();
      };
  }

  setEventListeners(){
      this._popupButtonExit.addEventListener('click', () => {this.close()});
      this._popupSelector.addEventListener('click', (evt) => {
          const evtTarget = evt.target;
          if (!this._popupContainer.contains(evtTarget)){
            this.close();
          }
      });
  }
}

