import dayjs from 'dayjs';

function getWeightForNullDate(pointA, pointB) {
  if (pointA === null && pointB === null) {
    return 0;
  }

  if (pointA === null) {
    return 1;
  }

  if (pointB === null) {
    return -1;
  }

  return null;
}

function sortPointByPrice(pointA, pointB) {
  const weight = getWeightForNullDate(pointA.basePrice, pointB.basePrice);
  return weight ?? pointB.basePrice - pointA.basePrice;
}

function sortPointByTime(pointA, pointB) {
  const weight = getWeightForNullDate(pointA, pointB);
  const timeB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));
  const timeA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));

  return weight ?? dayjs(timeB).diff(dayjs(timeA));
}

function sortPointByDate(pointA, pointB) {
  const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateFrom);
  return weight ?? dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}

export {
  sortPointByPrice,
  sortPointByTime,
  sortPointByDate
};
