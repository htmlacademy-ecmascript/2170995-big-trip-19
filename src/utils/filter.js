import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const isPointDateInPresent = (pointDateFrom, pointDateTo) => pointDateFrom.isSameOrBefore(dayjs()) && pointDateTo.isSameOrAfter(dayjs());
const isPointDateInFuture = (pointDateFrom) => pointDateFrom.isAfter(dayjs());
const isPointDateInPast = (pointDateTo) => pointDateTo.isBefore(dayjs());

const filterPointsByFuture = (points) => points.filter(({ dateFrom }) => isPointDateInFuture(dateFrom));
const filterPointsByPast = (points) => points.filter(({ dateTo }) => isPointDateInPast(dateTo));
const filterPointsByPresent = (points) => points.filter(({ dateFrom, dateTo }) => isPointDateInPresent(dateFrom, dateTo));

export { filterPointsByFuture, filterPointsByPast, filterPointsByPresent };
