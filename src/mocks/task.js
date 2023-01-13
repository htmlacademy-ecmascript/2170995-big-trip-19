import { nanoid } from 'nanoid';
import { getRandomPrice, getRandomPhoto, getRandomDate, countDuration, getRandomOffer } from '../helper/utils.js';
import { getRandomArrayElement } from '../helper/common.js';
import { TYPE, destination, description, offers } from '../const.js';

const getRandomTask = () => {
  const date = getRandomDate();
  const hasOffers = Math.random() > 0.5;

  return {
    basePrice: getRandomPrice(),
    destination: getRandomArrayElement(destination),
    type: getRandomArrayElement(TYPE),
    favorite: Math.random() > 0.5,
    startDate: date.start,
    endDate: date.end,
    duration: countDuration(date.start, date.end),
    offers: hasOffers ? getRandomOffer(offers) : null,
    photos: getRandomPhoto(),
    description: getRandomArrayElement(description),
    id: nanoid(),
  };
};


export {
  getRandomTask
};
