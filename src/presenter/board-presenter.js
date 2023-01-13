import { render, RenderPosition } from '../framework/render.js';
import { updateItem } from '../helper/common.js';
import List from '../view/list.js';
import CreateFirstPoint from '../view/create-first-point.js';
import ListSort from '../view/list-sort.js';

import PointPresenter from '../presenter/poin-presenter.js';


export default class BoardPresenter {
  #boardContainer = null;
  #tasksModel = null;
  #listComponent = new List();
  #firstPointComponent = new CreateFirstPoint();
  #listSort = new ListSort();

  #boardTasks = [];
  #pointPresenter = new Map();

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
  }

  init() {
    this.#boardTasks = [...this.#tasksModel.tasks];
    this.#renderList();
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#boardTasks = updateItem(this.#boardTasks, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #renderPoint(task) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#listComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init(task);
    this.#pointPresenter.set(task.id, pointPresenter);
  }

  #renderCreateFirstPoint() {
    render(this.#firstPointComponent, this.#listComponent.element);
  }

  #renderListSort() {
    render(this.#listSort, this.#listComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderList() {
    render(this.#listComponent, this.#boardContainer);

    if (this.#boardTasks.length === 0) {
      this.#renderCreateFirstPoint();
    } else {

      for (let i = 0; i < this.#boardTasks.length; i++) {
        this.#renderPoint(this.#boardTasks[i]);
      }
    }

    this.#renderListSort();
  }

  #clearList() {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }
}
