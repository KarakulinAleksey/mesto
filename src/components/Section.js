export default class Section{
  constructor({render},conteinerSelector){

    this._container = conteinerSelector;
    this._renderer = render;
  }

  setItem(element){
    this._container.prepend(element);
  }

  renderItems(initialCards){
    this._renderedItems = initialCards;

    if (Array.isArray(this._renderedItems)){

      this._renderedItems.forEach((item) => {
        this._renderer(item);
      });

    }

    else{

      this._renderer(this._renderedItems);

    }
  }
}
