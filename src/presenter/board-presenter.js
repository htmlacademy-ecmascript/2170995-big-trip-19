import ListSort from '../view/list-sort.js';
import List from '../view/list.js';
import EditPoint from '../view/edit-point.js';
import AddNewPoint from '../view/add-new-point.js';
import TripEvent from '../view/trip-event.js';

import { render } from '../render.js';


export default class BoardPresenter {
  listComponent = new List();

  constructor({ boardContainer }) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(new ListSort(), this.boardContainer);
    render(new EditPoint(), this.boardContainer);
    render(this.listComponent, this.boardContainer);

    for (let i = 0; i < 3; i++) {
      render(new TripEvent(), this.listComponent.getElement());
    }

    render(new AddNewPoint(), this.boardContainer);
  }
}
