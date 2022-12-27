import ListSort from '../view/list-sort.js';
import List from '../view/list.js';
import EditPoint from '../view/edit-point.js';
import AddNewPoint from '../view/add-new-point.js';
import TripEvent from '../view/trip-event.js';

import { render } from '../render.js';


export default class BoardPresenter {
  listComponent = new List();

  constructor({ boardContainer, tasksModel }) {
    this.boardContainer = boardContainer;
    this.tasksModel = tasksModel;
  }

  init() {
    this.boardTasks = [...this.tasksModel.getTasks()];

    render(new ListSort(), this.boardContainer);
    render(new AddNewPoint({ task: this.boardTasks[0] }), this.boardContainer);
    render(this.listComponent, this.boardContainer);

    for (let i = 1; i < this.boardTasks.length; i++) {
      render(new TripEvent({ task: this.boardTasks[i] }), this.listComponent.getElement());
    }

    render(new EditPoint({ task: this.boardTasks[1] }), this.boardContainer);
  }
}
