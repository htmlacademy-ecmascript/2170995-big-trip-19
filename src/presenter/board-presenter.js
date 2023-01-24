import { render, RenderPosition } from '../framework/render.js';
import { updateItem } from '../utils/common.js';
import { SortType } from '../const.js';
import { sortPointByPrice, sortPointByTime, sortPointByDate } from '../utils/sort.js';

import List from '../view/list.js';
import CreateFirstPoint from '../view/create-first-point.js';
import ListSort from '../view/list-sort.js';
import AddNewPoint from '../view/add-new-point.js';

import PointPresenter from '../presenter/poin-presenter.js';


export default class BoardPresenter {
  #boardContainer = null;
  #tasksModel = null;
  #listComponent = new List();
  #firstPointComponent = new CreateFirstPoint();
  #listSort = null;
  #currentSortType = null;
  #sourcedBoardPoints = [];

  #boardTasks = [];
  #pointPresenter = new Map();

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
  }

  init() {
    this.#boardTasks = [...this.#tasksModel.tasks];
    this.#sourcedBoardPoints = [...this.#tasksModel.tasks];
    this.#renderList();
  }

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.PRICE:
        this.#boardTasks.sort(sortPointByPrice);
        break;
      case SortType.TIME:
        this.#boardTasks.sort(sortPointByTime);
        break;
      default:
        this.#boardTasks.sort(sortPointByDate);
    }
    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearList();
    this.#renderPointList();
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#boardTasks = updateItem(this.#boardTasks, updatedPoint);
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedPoint);
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

  #renderPointList() {
    this.#boardTasks.forEach((boardPoint) => this.#renderPoint(boardPoint));
  }

  #renderCreateFirstPoint() {
    render(this.#firstPointComponent, this.#listComponent.element);
  }

  #renderListSort() {
    this.#listSort = new ListSort({
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#listSort, this.#listComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderAddnewPoint() {
    render(new AddNewPoint({ task: this.#boardTasks[4] }), this.#listComponent.element);
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
    this.#renderAddnewPoint();
  }

  #clearList() {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }
}
