import ListFilter from './view/list-filter.js';
import { render } from './render.js';
import BoardPresenter from './presenter/board-presenter.js';

const siteTripMainElement = document.querySelector('.trip-main');
const siteTripFilterElement = siteTripMainElement.querySelector('.trip-controls__filters');

const siteMainElement = document.querySelector('.trip-events');
const boardPresenter = new BoardPresenter({ boardContainer: siteMainElement });

render(new ListFilter(), siteTripFilterElement);


boardPresenter.init();
