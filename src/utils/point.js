import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const humanizePointEventDate = (date) => dayjs(date).format('MMM D');
const humanizePointTime = (date) => dayjs(date).format('HH-mm');
const humanizeEventTime = (date) => dayjs(date).format('DD/MM/YYYY HH-mm');

const humanizePointDuration = (dateFrom, dateTo) => {
  const start = dayjs(dateFrom);
  const finish = dayjs(dateTo);
  const eventDuration = dayjs.duration(finish.diff(start));

  if (eventDuration.days() === 0) {
    return eventDuration.format('HH[H] mm[M]');
  }

  if (eventDuration.days() === 0 && eventDuration.hours() === 0) {
    return eventDuration.format('mm[M]');
  }

  return eventDuration.format('DD[D] HH[H] mm[M]');
};

const sortByTime = (pointA, pointB) => {
  const durationA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const durationB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));

  return durationB - durationA;
};

const sortByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;


export {humanizePointEventDate, humanizePointTime, humanizePointDuration, humanizeEventTime, sortByTime, sortByPrice};
