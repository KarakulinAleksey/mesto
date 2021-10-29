export default class UserInfo {
  constructor(profileTitle, profileText) {
    this._profileTitle = profileTitle;
    this._profileText = profileText;
  }

  getUserInfo() {
    return {
      name: this._profileTitle.textContent,
      profession: this._profileText.textContent
    }
  }

  setUserInfo({ infoOdject }) {
    this._name = infoOdject.name;
    this._profession = infoOdject.about;
    this._profileTitle.textContent = this._name;
    this._profileText.textContent = this._profession;
  }
}
