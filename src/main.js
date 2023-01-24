import ListFilter from './view/list-filter.js';
import { render } from './framework/render.js';
import BoardPresenter from './presenter/board-presenter.js';
import TaskModel from './model/tasks-model.js';


const siteTripMainElement = document.querySelector('.trip-main');
const siteTripFilterElement = siteTripMainElement.querySelector('.trip-controls__filters');

const siteMainElement = document.querySelector('.trip-events');
const tasksModel = new TaskModel();

const boardPresenter = new BoardPresenter({ boardContainer: siteMainElement, tasksModel, });

render(new ListFilter(), siteTripFilterElement);


boardPresenter.init();
