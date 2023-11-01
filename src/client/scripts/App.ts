import '../styles/style.scss';
import { MagicValues } from '../../types/types';

import ElementCreator from './ElementCreator';
import Field from './Field';

const appProps: MagicValues<string> = {
  tag: 'main',
  nameClass: 'main',
};

const innerProps: MagicValues<string> = {
  tag: 'div',
  nameClass: 'main_inner',
};

const inputsFormProps: MagicValues<string> = {
  tag: 'div',
  nameClass: 'main_inputs',
};

class App {
  parent: HTMLElement;
  main: HTMLElement;
  radInput: HTMLInputElement;
  heightInput: HTMLInputElement;
  segmentsInput: HTMLInputElement;
  canvasBlock: HTMLDivElement;
  button: HTMLButtonElement;

  constructor(parent: HTMLElement) {
    this.parent = parent;
    this.main = this.createMain();
    this.radInput = this.createRadiusInput();
    this.heightInput = this.createHeightInput();
    this.segmentsInput = this.createSegmentsInput();
    this.button = this.createButton();
    this.canvasBlock = this.createCanvasBlock();
    this.configure();
  }

  public injectElem() {
    this.parent.append(this.main);
  }

  private configure() {
    const inner = new ElementCreator(innerProps).getElement;
    const inputsForm = new ElementCreator(inputsFormProps).getElement;

    const radBlock = this.wrapInput('Radius : ', this.radInput);
    const heightBlock = this.wrapInput('Height : ', this.heightInput);
    const segmentsBlock = this.wrapInput('Segments : ', this.segmentsInput);

    inputsForm.append(radBlock, heightBlock, segmentsBlock, this.button);
    inner.append(inputsForm, this.canvasBlock);
    this.main.append(inner);
  }

  private createMain() {
    const main = new ElementCreator(appProps).getElement;
    return main;
  }

  private createButton() {
    const button = document.createElement('button');
    button.classList.add('main_btn');
    button.innerText = 'submit';

    const btnHandler = async (canvas: HTMLElement) => {
      const values: MagicValues<string> = {
        radius: this.radInput.value,
        height: this.heightInput.value,
        segments: this.segmentsInput.value,
      };

      try {
        const request = await fetch('http://localhost:7000/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify(values),
        });

        const res = await request.json();
        const figure = new Field(this.canvasBlock, res);
        figure.init();
      } catch (error) {
        canvas.innerText = 'something goes wrong , try again please';
      }
    };

    button.addEventListener('click', () => {
      btnHandler(this.canvasBlock);
    });

    return button;
  }

  private wrapInput(text: string, input: HTMLInputElement) {
    const label = document.createElement('label');
    label.classList.add('main_label');
    label.innerText = text;
    label.append(input);
    return label;
  }

  private createRadiusInput() {
    const input = document.createElement('input');
    input.classList.add('main_radius-input');
    return input;
  }

  private createHeightInput(): HTMLInputElement {
    const input = document.createElement('input');
    input.classList.add('main_height-input');
    return input;
  }
  private createSegmentsInput(): HTMLInputElement {
    const input = document.createElement('input');
    input.classList.add('main_segments-input');
    return input;
  }

  private createCanvasBlock() {
    const canvasBlock = document.createElement('div');
    canvasBlock.classList.add('main_canvasBlock');
    return canvasBlock;
  }
}

export default App;
