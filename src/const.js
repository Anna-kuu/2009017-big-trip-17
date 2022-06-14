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
  INIT: 'INIT',
};

export {SortType, FilterType, UserAction, UpdateType};
