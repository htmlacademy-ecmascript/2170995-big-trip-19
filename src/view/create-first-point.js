module4-task1
import AbstractView from '../framework/view/abstract-view.js';


function createPoint() {
  return `<section class="trip-events">
  <h2 class="visually-hidden">Trip events</h2>
  <p class="trip-events__msg">Click New Event to create your first point</p>
</section>`;
}

module4-task1
export default class CreateFirstPoint extends AbstractView {
  get template() {
    return createPoint();
  }

}
