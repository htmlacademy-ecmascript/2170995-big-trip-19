import { render } from '../framework/render.js';
import List from '../view/list.js';
import EditPoint from '../view/edit-point.js';
import TripEvent from '../view/trip-event.js';
import CreateFirstPoint from '../view/create-first-point.js';
module4-task1


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

    render(this.#listComponent, this.#boardContainer);

    if (this.#boardTasks.length === 0) {
      render(new CreateFirstPoint(), this.#listComponent.element);
    } else {


      for (let i = 0; i < this.#boardTasks.length; i++) {
        this.#renderTask(this.#boardTasks[i]);
      }
    }
  }

  #renderTask(task) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const eventComponent = new TripEvent({
      task,
      onEditClick: () => {
        replacePointToForm.call(this);
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const eventEditComponent = new EditPoint({
      task,
      onEditClick: () => {
        replaceFormToPoint.call(this);
      },
      onFormSubmit: () => {
        replaceFormToPoint.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToForm() {
      this.#listComponent.element.replaceChild(eventEditComponent.element, eventComponent.element);
    }

    function replaceFormToPoint() {
      this.#listComponent.element.replaceChild(eventComponent.element, eventEditComponent.element);
    }

    render(eventComponent, this.#listComponent.element);
  }
}
