import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const humanizePointEventDate = (date) => dayjs(date).format('MMM D');
const humanizePointTime = (date) => dayjs(date).format('HH-mm');

const humanizeEventTime = (date) => dayjs(date).format('DD/MM/YYYY HH-mm');

const humanizePointDuration = (dateFrom, dateTo) => {
  const start = dayjs(dateFrom);
  const finish = dayjs(dateTo);
  const minutesDuration = dayjs.duration(finish.diff(start));

  if (minutesDuration.days() === 0) {
    return minutesDuration.format('HH[H] mm[M]');
  }

  if (minutesDuration.days() === 0 && minutesDuration.hours() === 0) {
    return minutesDuration.format('mm[M]');
  }

  return minutesDuration.format('DD[D] HH[H] mm[M]');
};

export {humanizePointEventDate, humanizePointTime, humanizePointDuration, humanizeEventTime};
