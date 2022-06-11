//const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const TYPES = ['taxi', 'flight'];

const DATE_FROM = ['2019-07-10T08:45:56.845Z', '2019-07-10T10:30:56.845Z', '2019-07-10T12:25:56.845Z', '2019-07-10T12:15:56.845Z'];
const DATE_TO = ['2019-07-10T13:45:57.375Z', '2019-07-10T14:00:56.845Z', '2019-07-10T16:05:56.845Z', '2019-07-10T18:25:56.845Z'];
const PRICE = [35, 20, 120, 222, 30, 15, 100, 40, 5, 60, 80];
const DESTINATION = ['Amsterdam', 'Geneva', 'Chamonix'];
const OFFERS_CHOOSE = [[1], [2], [3], [4], [1, 3], [2, 4], []];

const SortType = {
  DEFAULT: 'default',
  TIME: 'time',
  PRICE: 'price',
};

const FilterType = {
  EVERYTHING : 'everything',
  FUTURE : 'future',
  PAST : 'past',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export {TYPES, DATE_FROM, DATE_TO, PRICE, DESTINATION, OFFERS_CHOOSE, SortType, FilterType, UserAction, UpdateType};
