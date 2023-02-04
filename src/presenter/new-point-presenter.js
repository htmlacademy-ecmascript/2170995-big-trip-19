import { remove, render, RenderPosition } from '../framework/render.js';
import AddNewPoint from '../view/add-new-point.js';
import { UserAction, UpdateType } from '../const.js';

export default class NewPointPresenter {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #tripAddNewPointComponent = null;

  #offersByType = null;
  #destinations = null;

  constructor({ pointListContainer, onDataChange, onDestroy }) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init(offersByType, destinations) {
    this.#offersByType = offersByType;
    this.#destinations = destinations;

    if (this.#tripAddNewPointComponent !== null) {
      return;
    }

    this.#tripAddNewPointComponent = new AddNewPoint({
      offersByType: this.#offersByType,
      destinations: this.#destinations,
      onFormSubmit: this.#handleFormSubmit,
      onCancelClick: this.#handleCancelClick,
    });

    render(this.#tripAddNewPointComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#tripAddNewPointComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#tripAddNewPointComponent);
    this.#tripAddNewPointComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#tripAddNewPointComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#tripAddNewPointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#tripAddNewPointComponent.shake(resetFormState);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MAJOR,
      point,
    );
  };

  #handleCancelClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
