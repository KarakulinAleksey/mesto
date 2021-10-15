export default class Section{
  constructor({data, render},conteinerSelector){
    this._renderedItems = data;
    this._container = conteinerSelector;
    this._renderer = render;
  }
  setItem(element){
    this._container.prepend(element);
  }
  renderItems(){
    console.log(this._renderedItems);
    if (Array.isArray(this._renderedItems))
    {
      this._renderedItems.forEach((item) => {
        this._renderer(item);
      });
    }
    else
    {
      this._renderer(this._renderedItems);
    }
  }
}
