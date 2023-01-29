import dayjs from 'dayjs';
import { getRandomInteger } from './common.js';

// Генерация фото
const getRandomPhoto = () => {
  const photos = [];

  for (let i = 0; i < 4; i++) {
    photos[i] = `http://picsum.photos/248/152?r=${Math.random()}`;
  }

  return photos;
};

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

const isDatesEqual = (dataA, dataB) => (dataA === null && dataB === null) || dayjs(dataA).isSame(dataB, 'D');

export {
  getRandomPhoto,
  getRandomDate,
  countDuration,
  constructionDuration,
  isDatesEqual
};
