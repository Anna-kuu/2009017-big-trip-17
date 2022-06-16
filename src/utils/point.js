import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { FilterType } from '../const';
dayjs.extend(duration);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const humanizePointEventDate = (date) => dayjs(date).format('MMM D');
const humanizePointTime = (date) => dayjs(date).format('HH-mm');
const humanizeEventTime = (date) => dayjs(date).format('DD/MM/YYYY HH-mm');

const humanizePointDuration = (dateFrom, dateTo) => {
  const start = dayjs(dateFrom);
  const finish = dayjs(dateTo);
  const eventDuration = dayjs.duration(finish.diff(start));

  if (eventDuration.days() === 0 && eventDuration.hours() === 0) {
    return eventDuration.format('mm[M]');
  }

  if (eventDuration.days() === 0) {
    return eventDuration.format('HH[H] mm[M]');
  }

  return eventDuration.format('DD[D] HH[H] mm[M]');
};

const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'mm');

const sortByDay = (pointA, pointB) => dayjs(pointA.dateFrom) - dayjs(pointB.dateFrom);

const sortByTime = (pointA, pointB) => {
  const durationA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const durationB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));

  return durationB - durationA;
};

const sortByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

const filter = {
  [FilterType.EVERYTHING] : (points) => points,
  [FilterType.FUTURE] : (points) => points.filter((point) => dayjs(point.dateFrom).isSameOrAfter(dayjs())),
  [FilterType.PAST] : (points) => points.filter((point) => dayjs(point.dateTo).isSameOrBefore(dayjs())),
};

export {humanizePointEventDate, humanizePointTime, humanizePointDuration, humanizeEventTime, isDatesEqual, sortByDay, sortByTime, sortByPrice, filter};
