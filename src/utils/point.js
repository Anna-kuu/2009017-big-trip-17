import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);


const a = dayjs('2019-07-10T08:45:56.845Z');
const b = dayjs('2019-07-10T13:45:56.375Z');
const ab = dayjs.duration(b.diff(a));
console.log(ab);
console.log(ab.format('DD HH[H] mm[M]'));

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

export {humanizePointEventDate, humanizePointTime, humanizePointDuration, humanizeEventTime};
