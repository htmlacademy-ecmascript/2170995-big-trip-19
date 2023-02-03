import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { FilterType } from '../const.js';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const isPointFuture = (dateFrom) => dateFrom && dayjs(dateFrom).isAfter(dayjs());
const isPointPresent = (dateFrom, dateTo) => dateFrom && dateTo && dayjs(dateFrom).isSameOrBefore(dayjs()) && dayjs(dateTo).isSameOrAfter(dayjs());
const isPointPast = (dateTo) => dateTo && dayjs(dateTo).isBefore(dayjs());

const filter = {
  [FilterType.EVERYTHING]: (points) => points.filter((point) => point !== null),
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointFuture(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPointPresent(point.dateFrom, point.dateTo)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointPast(point.dateTo)),
};

export {
  filter
};
