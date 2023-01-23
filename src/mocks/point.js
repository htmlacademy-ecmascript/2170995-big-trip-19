import { nanoid } from 'nanoid';
import { getRandomPhoto, getRandomDate, countDuration } from '../utils/task.js';
import { getRandomArrayElement, getRandomInteger } from '../utils/common.js';
import { POINT_TYPES, DESCRIPTIONS, OFFERS, randomDestinations } from '../const.js';

const date = getRandomDate();

function createRandomPoint() {
  return {
    id: nanoid(),
    ...{
      basePrice: getRandomInteger(1, 100) * 10,
      destination: getRandomArrayElement(randomDestinations),
      type: getRandomArrayElement(POINT_TYPES),
      favorite: Math.random() > 0.5,
      startDate: date.start,
      endDate: date.end,
      duration: countDuration(date.start, date.end),
      offers: OFFERS,
      photos: getRandomPhoto(),
      description: getRandomArrayElement(DESCRIPTIONS),
    }
  };
}


export {
  createRandomPoint
};
