import { TYPES } from '../const.js';
import { getRandomInteger } from '../utils.js';

const getRandomType = () => {
  const randomIndex = getRandomInteger(0, TYPES.length - 1);

  return TYPES[randomIndex];
};

export const generateOffer = () => ({
  type: 'taxi',
  offers: [
    {
      id: 1,
      title: 'Upgrade to a business class',
      price: 120
    }, {
      id: 2,
      title: 'Choose the radio station',
      price: 60
    }
  ]
});

export const generatePoint = () => ({
  basePrice: 35,
  dateFrom: '2019-07-10T10:45:56.845Z',
  dateTo: '2019-07-11T11:45:56.375Z',
  //destination: $Destination$,
  isFavorite: Boolean(getRandomInteger(0, 1)),
  offers: [1],
  type: getRandomType(),
});
