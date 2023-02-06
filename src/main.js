import { render } from './framework/render.js';

import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsApiService from './points-api-service.js';

import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';

import NewPointButton from './view/new-point-button-view.js';


const AUTHORIZATION = 'Basic fm0sSqt48Pabgjsa5a';
const END_POINT = 'https://19.ecmascript.pages.academy/big-trip/';

const bodyElement = document.querySelector('.page-body');
const tripInfoElement = bodyElement.querySelector('.trip-main');
const filtersElement = bodyElement.querySelector('.trip-controls__filters');
const siteTripMainElement = bodyElement.querySelector('.trip-main');
const siteMainElement = bodyElement.querySelector('.trip-events');

const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const filterModel = new FilterModel();

const boardPresenter = new BoardPresenter({
  boardContainer: siteMainElement,
  infoContainer: tripInfoElement,
  pointsModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose,
});

const filterPresenter = new FilterPresenter({
  filterContainer: filtersElement,
  filterModel,
  pointsModel
});

const newPointButtonComponent = new NewPointButton({
  onClick: handleNewPointButtonClick
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  boardPresenter.createPoint(pointsModel);
  newPointButtonComponent.element.disabled = true;
}


boardPresenter.init(pointsModel);
filterPresenter.init();
pointsModel.init()
  .finally(() => {
    render(newPointButtonComponent, siteTripMainElement);
  });
