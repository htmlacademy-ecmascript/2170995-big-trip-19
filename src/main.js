import { render } from './framework/render.js';

import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';

import TaskModel from './model/tasks-model.js';
import FilterModel from './model/filter-model.js';

import NewPointButton from './view/new-point-button-view.js';

const bodyElement = document.querySelector('.page-body');
const siteTripMainElement = bodyElement.querySelector('.trip-main');
const siteMainElement = bodyElement.querySelector('.trip-events');

const tasksModel = new TaskModel();
const filterModel = new FilterModel();

const boardPresenter = new BoardPresenter({
  boardContainer:
    siteMainElement,
  tasksModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose,
});

const filterPresenter = new FilterPresenter({
  filterContainer: siteTripMainElement,
  filterModel,
  tasksModel
});

const newPointButtonComponent = new NewPointButton({
  onClick: handleNewPointButtonClick
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  boardPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

render(newPointButtonComponent, siteTripMainElement);

boardPresenter.init();
filterPresenter.init();
