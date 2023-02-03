import { remove, render, RenderPosition } from '../framework/render.js';
import { SortType, UserAction, UpdateType, FilterType } from '../const.js';
import { sortPointByPrice, sortPointByTime, sortPointByDate } from '../utils/sort.js';
import { filter } from '../utils/filter.js';

import List from '../view/list.js';
import CreateFirstPoint from '../view/create-first-point.js';
import ListSort from '../view/list-sort.js';
import LoadingView from '../view/loading-view.js';

import PointPresenter from '../presenter/poin-presenter.js';
import NewPointPresenter from '../presenter/new-point-presenter.js';


export default class BoardPresenter {
  #boardContainer = null;

  #tasksModel = null;
  #filterModel = null;

  #listComponent = new List();
  #firstPointComponent = null;
  #loadingComponent = new LoadingView();

  #listSort = null;
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;

  #pointPresenter = new Map();
  #newPointPresenter = null;

  constructor({ boardContainer, tasksModel, filterModel, onNewPointDestroy }) {
    this.#boardContainer = boardContainer;

    this.#tasksModel = tasksModel;
    this.#tasksModel.addObserver(this.#handleModelEvent);

    this.#filterModel = filterModel;
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#listComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy,
    });
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#tasksModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.PRICE:
        return filteredPoints.sort(sortPointByPrice);
      case SortType.TIME:
        return filteredPoints.sort(sortPointByTime);
      case SortType.DAY:
        return filteredPoints.sort(sortPointByDate);
    }

    return filteredPoints;
  }

  get offers() {
    return this.#tasksModel.offers;
  }

  get destinations() {
    return this.#tasksModel.destinations;
  }

  init({ offers, destinations }) {
    this.#renderList(offers, destinations);
  }

  createPoint({ offers, destinations }) {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init(offers, destinations);
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#tasksModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#tasksModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#tasksModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearList();
        this.#renderList();
        break;
      case UpdateType.MAJOR:
        this.#clearList({ resetSortType: true });
        this.#renderList();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderList();
        break;
    }
  };

  #renderPoint(point, offers, destinations) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#listComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init(point, offers, destinations);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderPointList(points, offers, destinations) {
    points.forEach((point) => this.#renderPoint(point, offers, destinations));
  }

  #renderCreateFirstPoint() {
    this.#firstPointComponent = new CreateFirstPoint({
      filterType: this.#filterType
    });

    render(this.#firstPointComponent, this.#listComponent.element);
  }

  #renderListSort() {
    this.#listSort = new ListSort({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#listSort, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#boardContainer);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearList();
    this.#renderList();
  };

  #renderList() {
    const points = this.points;
    const pointsCount = points.length;
    const offers = this.offers;
    const destinations = this.destinations;

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (pointsCount === 0) {
      this.#renderCreateFirstPoint();
      return;
    }

    this.#renderListSort();
    render(this.#listComponent, this.#boardContainer);
    this.#renderPointList(points, offers, destinations);
  }

  #clearList({ resetSortType = false } = {}) {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#listSort);
    remove(this.#loadingComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }

    if (this.#firstPointComponent) {
      remove(this.#firstPointComponent);
    }
  }
}
