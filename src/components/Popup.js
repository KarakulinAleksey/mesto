export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupButtonExit = this._popup.querySelector(
      ".popup__form-button-exit"
    );
    this._popupContainer = this._popup.querySelector(".popup__container");
  }

  open() {
    this._popup.classList.add("popup_show");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_show");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key == "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    this._popupButtonExit.addEventListener("click", () => {
      this.close();
    });

    this._popup.addEventListener("click", (evt) => {
      const evtTarget = evt.target;
      if (!this._popupContainer.contains(evtTarget)) {
        this.close();
      }
    });
  }
}
