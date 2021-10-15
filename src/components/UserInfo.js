export default class UserInfo{
  constructor({infoOdject}, profileTitle, profileText){
    this._name = infoOdject.name;
    this._profession = infoOdject.profession;
    this._profileTitle = profileTitle;
    this._profileText = profileText;
  }

  getUserInfo(){return{
    name: this._profileTitle.textContent,
    profession: this._profileText.textContent}
  }

  setUserInfo(){
    this._profileTitle.textContent = this._name;
    this._profileText.textContent = this._profession;
  }
}
