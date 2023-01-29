import AbstractView from '../framework/view/abstract-view.js';
import { FILTER_TYPES } from '../const.js';

const NoPointTextType = {
  [FILTER_TYPES.everything]: 'Click New Event to create your first point',
  [FILTER_TYPES.future]: 'There are no future events now',
  [FILTER_TYPES.past]: 'There are no past events now',
  [FILTER_TYPES.present]: 'There are no present events now',
};


function createPoint(filterType) {
  const noPointTextValue = NoPointTextType[filterType];

  return `<section class="trip-events">
  <h2 class="visually-hidden">Trip events</h2>
  <p class="trip-events__msg">${noPointTextValue}</p>
</section>`;
}

export default class CreateFirstPoint extends AbstractView {
  #filterType = null;

  constructor({ filterType }) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createPoint(this.#filterType);
  }
}
