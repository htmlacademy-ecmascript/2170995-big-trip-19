import dayjs from 'dayjs';

// Случайный массив
const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

// Случайное число
const getRandomInteger = (min, max) => min + Math.floor(Math.random() * (max - min));

// Генерация фото
const getRandomPhoto = () => {
  const photos = [];

  for (let i = 0; i < 4; i++) {
    photos[i] = `http://picsum.photos/248/152?r=${Math.random()}`;
  }

  return photos;
};

// Генерация цены
const getRandomPrice = () => getRandomInteger(1, 100) * 10;

// Генерация даты
const getRandomDate = () => {
  const maxCount = 20;
  const minCount = 1;

  const startDate = dayjs()
    .add(getRandomInteger(minCount, maxCount), 'day')
    .add(getRandomInteger(minCount, maxCount), 'hour')
    .add(getRandomInteger(minCount, maxCount), 'minute');

  const endDate = startDate.clone()
    .add(getRandomInteger(0, maxCount), 'day')
    .add(getRandomInteger(0, 59), 'hour')
    .add(getRandomInteger(0, 59), 'minute');

  return {
    start: startDate.toDate(),
    end: endDate.toDate()
  };
};

//  Продолжительность даты и времени
const countDuration = (start, end) => {
  const interval = new Date(end - start);

  return {
    days: interval.getUTCDate() - 1,
    hours: interval.getUTCHours(),
    minutes: interval.getUTCMinutes()
  };
};

const constructionDuration = (interval) => {
  const duration = [];
  if (interval.days !== 0) {
    duration[0] = String(interval.days).padStart(2, '0');
    duration[0] += 'D';
  }
  if (interval.hours !== 0) {
    duration[1] = String(interval.hours).padStart(2, '0');
    duration[1] += 'H';
  }
  if (interval.minutes !== 0) {
    duration[2] = String(interval.minutes).padStart(2, '0');
    duration[2] += 'M';
  }

  return duration.join('');
};

// Генерация офферов для точек
const getRandomOffer = (offers) => {
  const offersAmount = getRandomInteger(1, 5);
  const randomOffers = [];

  for (let i = 0; i < offersAmount; i++) {
    const offer = getRandomArrayElement(offers);
    if (randomOffers.indexOf(offer) === -1) {
      randomOffers.push(offer);
    }
  }

  return randomOffers;
};

const generatesEventOffer = (offers) => offers.map((offer) => {
  const { title, price } = offer;

  return (`
  <li class="event__offer">
                    <span class="event__offer-title">${title}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${price}</span>
                  </li>
  `
  );
}).join('\n');


// Генерация офферов для формы
const generatesFormOffers = (offers) => offers.map((offer, index) => {
  const { id, title, price, isChecked } = offer;

  return (`
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}-${index + 1}" type="checkbox" name="event-offer-${id}"
      ${isChecked ? 'checked' : ''}>
        <label class="event__offer-label" for="event-offer-${id}-${index + 1}">
          <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
        </label>
      </div>
  `);
}).join('');

const getRandomFormOffers = (offers) => {
  const eventOffers = generatesFormOffers(offers);

  return (`
  <section class="event__section  event__section--offers">
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
  <div class="event__available-offers">
    ${eventOffers}
  </div>
</section>
  `);
};

export {
  getRandomArrayElement,
  getRandomInteger,
  getRandomPhoto,
  getRandomPrice,
  getRandomDate,
  countDuration,
  constructionDuration,
  getRandomOffer,
  generatesEventOffer,
  getRandomFormOffers
};
