import AbstractView from '../framework/view/abstract-view.js';

function createList() {
  return '<ul class="trip-events__list"></ul>';
}

export default class List extends AbstractView {
  get template() {
    return createList();
  }
}
