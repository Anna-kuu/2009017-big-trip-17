import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const humanizePointEventDate = (date) => dayjs(date).format('MMM D');
const humanizePointTime = (date) => dayjs(date).format('HH-mm');

const humanizeEventTime = (date) => dayjs(date).format('DD/MM/YYYY HH-mm');


const humanizePointDuration = (dateFrom, dateTo) => {
  const start = dayjs(dateFrom);
  const finish = dayjs(dateTo);
  const minutesDuration = finish.diff(start, 'minute');

  if (60 <= minutesDuration && minutesDuration <= 720) {
    return `${(`00${  Math.floor(minutesDuration/60)}`).slice(-2)  }H ${  (`00${  minutesDuration%60}`).slice(-2) }M`;
  }

  return `${(`00${minutesDuration}`).slice(-2) }M`;
};
/*const humanizePointDuration = (dateFrom, dateTo) => {
  const minutesFrom = Math.floor(dayjs(dateFrom).format('mm')) + Math.floor(dayjs(dateFrom).format('HH')*60);
  const minutesTo = Math.floor(dayjs(dateTo).format('mm')) + Math.floor(dayjs(dateTo).format('HH')*60);
  const minutesDuration = minutesTo - minutesFrom;

  if (60 <= minutesDuration && minutesDuration <= 720) {
    return `${(`00${  Math.floor(minutesDuration/60)}`).slice(-2)  }H ${  (`00${  minutesDuration%60}`).slice(-2) }M`;
  }

  return `${(`00${minutesDuration}`).slice(-2) }M`;
};*/

export {getRandomInteger, humanizePointEventDate, humanizePointTime, humanizePointDuration, humanizeEventTime};
