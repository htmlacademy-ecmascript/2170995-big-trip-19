import AbstractView from '../framework/view/abstract-view.js';
import { FILTER_TYPES } from '../const.js';

const filterTypeValues = Object.entries(FILTER_TYPES);

function createListFilter() {
  return `<form class="trip-filters" action="#" method="get">
  ${filterTypeValues.map(([name, attr]) => (
    `<div class="trip-filters__filter">
    <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${attr}>
    <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
  </div>`
  )).join('')}
<button class="visually-hidden" type="submit">Accept filter</button>
</form>`;
}

export default class ListFilter extends AbstractView {
  get template() {
    return createListFilter();
  }
}
