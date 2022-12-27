import { createElement } from '../render.js';
import { constructionDuration, generatesEventOffer } from '../helper/utils.js';
import dayjs from 'dayjs';

function createTripEvent(task) {

  const { basePrice, type, destination, startDate, endDate, duration, offers, favorite } = task;

  // Дни и время
  const startDay = dayjs(startDate).format('MMM D');
  const startDayDateTime = dayjs(startDate).format('YYYY-MM-DD');
  const startTime = dayjs(startDate).format('HH:mm');
  const startTimeDateTime = dayjs(startDate).format('YYYY-MM-DDTHH:mm');
  const endTime = dayjs(endDate).format('HH:mm');
  const endTimeDateTime = dayjs(endDate).format('YYYY-MM-DDTHH:mm');

  const eventDuration = constructionDuration(duration);
  const eventOffers = offers !== null ? generatesEventOffer(offers) : '';
  const isFavorite = favorite ? 'event__favorite-btn--active' : '';
  return `
  <li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${startDayDateTime}">${startDay}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${destination}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${startTimeDateTime}">${startTime}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${endTimeDateTime}">${endTime}</time>
                  </p>
                  <p class="event__duration">${eventDuration}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  ${eventOffers}
                </ul>
                <button class="event__favorite-btn ${isFavorite}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>
`;
}

export default class TripEvent {
  constructor({ task }) {
    this.task = task;
  }

  getTemplate() {
    return createTripEvent(this.task);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
