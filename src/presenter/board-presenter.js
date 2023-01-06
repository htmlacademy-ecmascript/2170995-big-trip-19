import ListSort from '../view/list-sort.js';
import List from '../view/list.js';
import EditPoint from '../view/edit-point.js';
// import AddNewPoint from '../view/add-new-point.js';
import TripEvent from '../view/trip-event.js';

import { render } from '../render.js';


export default class BoardPresenter {
  #boardContainer = null;
  #tasksModel = null;
  #listComponent = new List();

  #boardTasks = [];

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
  }

  init() {
    this.#boardTasks = [...this.#tasksModel.tasks];

    render(new ListSort(), this.#boardContainer);
    render(this.#listComponent, this.#boardContainer);

    for (let i = 0; i < this.#boardTasks.length; i++) {
      this.#renderTask(this.#boardTasks[i]);
    }
  }

  #renderTask(task) {
    const eventComponent = new TripEvent({ task });
    const eventEditComponent = new EditPoint({ task });

    const replacePointToForm = () => {
      this.#listComponent.element.replaceChild(eventEditComponent.element, eventComponent.element);
    };

    const replaceFormToPoint = () => {
      this.#listComponent.element.replaceChild(eventComponent.element, eventEditComponent.element);
    };

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    eventComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();
      document.addEventListener('keydown', escKeyDownHandler);
    });

    eventEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.addEventListener('keydown', escKeyDownHandler);
    });

    eventEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceFormToPoint();
    });

    render(eventComponent, this.#listComponent.element);
  }
}
