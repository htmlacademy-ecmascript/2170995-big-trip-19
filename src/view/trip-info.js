import AbstractView from '../framework/view/abstract-view';
import dayjs from 'dayjs';

function getTripDates(points) {
  const dateFrom = dayjs(points[0].dateFrom).format('D MMM');
  const dateTo = dayjs(points.at(-1).dateTo).format('D MMM');

  if (points.length === 0) {
    return '... - ...';
  }

  return [dateFrom, dateTo].join(' - ');
}

function getTripCostValue(points, offers) {
  let offersPriceCount = 0;
  const basePriceCount = points.reduce((total, point) => total + point.basePrice, 0);

  if (points.length === 0) {
    return 0;
  }

  for (const point of points) {
    const offersByType = offers.find((offer) => point.type === offer.type);

    for (const offer of offersByType.offers) {
      if (point.offers.includes(offer.id)) {
        offersPriceCount += offer.price;
      }
    }
  }

  const tripPriceTotal = basePriceCount + offersPriceCount;

  return tripPriceTotal;
}

function getTripTitle(points, destinations) {
  const MAX_DESTINATIONS_TITLE = 3;
  let selectedDestinations = destinations.filter((destination) => points
    .find((point) => point.destination === destination.id));

  selectedDestinations = selectedDestinations.map((destination) => destination.name);

  if (points.length === 0) {
    return '';
  }

  if (selectedDestinations.length > MAX_DESTINATIONS_TITLE) {
    const startDestination = destinations.find((destination) => points[0].destination === destination.id).name;
    const endDestination = destinations.find((destination) => points.at(-1).destination === destination.id).name;

    return [startDestination, endDestination].join(' &mdash; ... &mdash; ');
  }

  return selectedDestinations.join(' &mdash; ');
}

function createTripInfoTemplate(points, offers, destinations) {
  return (`
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${getTripTitle(points, destinations)}</h1>

          <p class="trip-info__dates">${getTripDates(points)}</p>
      </div>

          <p class="trip-info__cost">
            Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTripCostValue(points, offers)}</span>
          </p>
    </section>
  `);
}


export default class TripInfo extends AbstractView {
  #points = [];
  #offers = [];
  #destinations = [];

  constructor({ points, offers, destinations }) {
    super();
    this.#points = points;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  get template() {
    return createTripInfoTemplate(this.#points, this.#offers, this.#destinations);
  }
}
