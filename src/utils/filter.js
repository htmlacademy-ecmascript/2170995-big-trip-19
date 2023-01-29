import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { FILTER_TYPES } from '../const.js';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const isPointFuture = (dateFrom) => dateFrom && dayjs(dateFrom).isAfter(dayjs());
const isPointPresent = (dateFrom, dateTo) => dateFrom && dateTo && dayjs(dateFrom).isSameOrBefore(dayjs()) && dayjs(dateTo).isSameOrAfter(dayjs());
const isPointPast = (dateTo) => dateTo && dayjs(dateTo).isBefore(dayjs());

const filter = {
  [FILTER_TYPES.everything]: (points) => points.filter((point) => point !== null),
  [FILTER_TYPES.future]: (points) => points.filter((point) => isPointFuture(point.dateFrom)),
  [FILTER_TYPES.present]: (points) => points.filter((point) => isPointPresent(point.dateFrom, point.dateTo)),
  [FILTER_TYPES.past]: (points) => points.filter((point) => isPointPast(point.dateTo)),
};

export {
  filter
};
