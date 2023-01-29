/* eslint-disable indent */
import dayjs from 'dayjs';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { POINT_TYPES, OffersByType, randomDestinations } from '../const.js';
import { createRandomPoint } from '../mocks/point.js';

const destinationsName = [];
randomDestinations.forEach((mockDestination) => destinationsName.push(mockDestination.name));

function createNewPoint(task) {
  const pointTypeDestination = task.destination;
  const pointDestination = randomDestinations.find((destination) => destination.id === pointTypeDestination.id);
  const pointDescription = pointDestination.description;
  const pointName = pointDestination.name;

  const pointTypeAllOffers = OffersByType.find((offer) => offer.type === task.type);
  const pointTypeOffer = task.offers.find((offer) => offer.type === task.type);

  const pointTypesPicture = pointDestination.picture;

  const { basePrice, type, startDate, endDate } = task;

  const startTime = dayjs(startDate).format('DD/MM/YY HH:mm');
  const endTime = dayjs(endDate).format('DD/MM/YY HH:mm');

  function createHeaderList() {
    return (`
    <fieldset class="event__type-group">
    <legend class="visually-hidden">Event type</legend>
      ${POINT_TYPES.map((typeList) =>
    (`<div class="event__type-item">
      <input id="event-type-${typeList}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeList}">
      <label class="event__type-label  event__type-label--${typeList}" for="event-type-${typeList}-1">${typeList}</label>
    </div>`
    )).join('')}
  </fieldset>
    `);
  }

  function createOffer() {
    return pointTypeAllOffers && pointTypeOffer ? (
      `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
      ${pointTypeAllOffers.offers.map(({ title, price, id }) => {
        const isChecked = pointTypeOffer.id.includes(id) ? 'checked' : '';
        return (
          `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}-2" type="checkbox" name="event-offer-${id}" ${isChecked}>
            <label class="event__offer-label" for="event-offer-${id}-2">
              <span class="event__offer-title">${title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${price}</span>
            </label>
          </div>`
        );
      }).join('')
      }
    </div>
    </section>`
    ) : '';
  }

  function createDestination() {
    return pointTypeDestination ? (`
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${pointDescription}</p>

    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${pointTypesPicture.map(({ src, description }) =>
    (`<img class="event__photo" src="${src}" alt="${description}">`
    )).join('')}
      </div>
    </div>
    `) : '';
  }

  return `
  <section class="trip-events">
          <h2 class="visually-hidden">Trip events</h2>
  <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-2">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="${type}">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-2" type="checkbox">

                    <div class="event__type-list">
                    ${createHeaderList()}
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${pointName}" list="destination-list-1">
                    <datalist id="destination-list-1">
                    ${destinationsName.map((city) => (`<option value="${city}"></option>`)).join('')}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startTime}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endTime}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                ${createOffer()}
                  </section>

                  <section class="event__section  event__section--destination">
                  ${createDestination()}
                  </section>
                </section>
              </form>
              </section>
  `;
}

export default class AddNewPoint extends AbstractStatefulView {
  #handleFormSubmit = null;
  #datepicker = null;

  constructor({ task = createRandomPoint(), onFormSubmit }) {
    super();
    this._setState(AddNewPoint.parsePointToState(task));
    this._restoreHandlers();

    this.#handleFormSubmit = onFormSubmit;
  }

  get template() {
    return createNewPoint(this._state);
  }

  removeElement() {
    super.removeElement();
  }

  reset(point) {
    this.updateElement(
      AddNewPoint.parsePointToState(point),
    );
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);

    this.element.querySelector('.event__type-list').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#nameChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceInputHandler);

    this.#setDatepicker();
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
    });
  };

  #nameChangeHandler = (evt) => {
    evt.preventDefault();
    const pointDestination = randomDestinations.find((destination) => destination.name === evt.target.value);
    if (pointDestination) {
      this.updateElement({
        destinations: {
          ...this._state.destinations,
          name: evt.target.value,
          id: pointDestination.id,
        }
      });
    }
  };

  #priceInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: evt.target.value,
    });
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #setDatepicker() {

    this.#datepicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'j/m/y H:i',
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
      },
    );

    this.#datepicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        dateFormat: 'j/m/y H:i',
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom,
        onChange: this.#dateToChangeHandler,
      },
    );
  }

  static parsePointToState(point) {
    return { ...point, };
  }

  static parseStateToPoint(point) {
    return { ...point, };
  }
}
