import { render, replace, remove } from '../framework/render.js';
import ListFilter from '../view/list-filter';
import { filter } from '../utils/filter.js';
import { FILTER_TYPES, UpdateType } from '../const.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #taskModel = null;
  #filterComponent = null;

  constructor({ filterContainer, filterModel, tasksModel }) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#taskModel = tasksModel;

    this.#taskModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const tasks = this.#taskModel.points;

    return [
      {
        type: FILTER_TYPES.everything,
        name: 'everything',
        count: filter[FILTER_TYPES.everything](tasks).length,
      },
      {
        type: FILTER_TYPES.future,
        name: 'future',
        count: filter[FILTER_TYPES.future](tasks).length,
      },
      {
        type: FILTER_TYPES.present,
        name: 'present',
        count: filter[FILTER_TYPES.present](tasks).length,
      },
      {
        type: FILTER_TYPES.past,
        name: 'past',
        count: filter[FILTER_TYPES.past](tasks).length,
      }
    ];
  }

  init() {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new ListFilter({
      filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
