import { createElement } from '../render.js';

function createPoint() {
  return `<section class="trip-events">
  <h2 class="visually-hidden">Trip events</h2>
  <p class="trip-events__msg">Click New Event to create your first point</p>
</section>`;
}

export default class CreateFirstPoint {
  #element = null;
  get template() {
    return createPoint();
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
