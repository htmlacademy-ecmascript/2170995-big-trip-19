import { render } from './framework/render.js';

import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsApiService from './points-api-service.js';

import TaskModel from './model/tasks-model.js';
import FilterModel from './model/filter-model.js';

import NewPointButton from './view/new-point-button-view.js';


const AUTHORIZATION = 'Basic fm0sSqt48Pabgjsa5';
const END_POINT = 'https://19.ecmascript.pages.academy/big-trip/';

const bodyElement = document.querySelector('.page-body');
const tripInfoElement = bodyElement.querySelector('.trip-main');
const filtersElement = bodyElement.querySelector('.trip-controls__filters');
const siteTripMainElement = bodyElement.querySelector('.trip-main');
const siteMainElement = bodyElement.querySelector('.trip-events');

const tasksModel = new TaskModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const filterModel = new FilterModel();

const boardPresenter = new BoardPresenter({
  boardContainer: siteMainElement,
  infoContainer: tripInfoElement,
  tasksModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose,
});

const filterPresenter = new FilterPresenter({
  filterContainer: filtersElement,
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
  boardPresenter.createPoint(tasksModel);
  newPointButtonComponent.element.disabled = true;
}


boardPresenter.init(tasksModel);
filterPresenter.init();
tasksModel.init()
  .finally(() => {
    render(newPointButtonComponent, siteTripMainElement);
  });
