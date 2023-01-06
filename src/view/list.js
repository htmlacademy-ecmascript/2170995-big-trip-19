import { createElement } from '../render.js';

function createList() {
  return '<ul class="trip-events__list"></ul>';
}

export default class List {
  #element = null;
  get template() {
    return createList();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
