import { createElement } from '../render.js';

function createList() {
  return '<ul class="trip-events__list"></ul>';
}

export default class List {
  getTemplate() {
    return createList();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
