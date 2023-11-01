import { MagicValues } from '../../types/types';

class ElementCreator {
  tag: string;
  nameClass: string;
  constructor(props: MagicValues<string>) {
    this.tag = props.tag;
    this.nameClass = props.nameClass;
  }

  private creator() {
    const elem: HTMLElement = document.createElement(this.tag);
    elem.classList.add(this.nameClass);
    return elem;
  }

  public get getElement(): HTMLElement {
    return this.creator();
  }
}

export default ElementCreator;
