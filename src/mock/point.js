import { TYPES, DATE_FROM, DATE_TO, PRICE, DESTINATION, OFFERS_CHOOSE } from '../const.js';
import { getRandomInteger } from '../utils.js';

const getRandomType = () => TYPES[getRandomInteger(0, TYPES.length - 1)];
const getRandomDateFrom = () => DATE_FROM[getRandomInteger(0, DATE_FROM.length - 1)];
const getRandomDateTo = () => DATE_TO[getRandomInteger(0, DATE_TO.length -1)];
const getPrice = () => PRICE[getRandomInteger(0, PRICE.length - 1)];
const getRandomDestination = () => DESTINATION[getRandomInteger(0, DESTINATION.length - 1)];
const getRandomOffers = () => OFFERS_CHOOSE[getRandomInteger(0, OFFERS_CHOOSE.length - 1)];

export const generateOffer = () => [{
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
    }, {
      id: 3,
      title: 'Order Uber',
      price: 20
    }, {
      id: 4,
      title: 'Rent a car ',
      price: 200
    }, {
      id: 5,
      title: 'Add breakfast',
      price: 50
    }
  ]
},{
  type: 'flight',
  offers: [
    {
      id: 1,
      title: 'Upgrade to a business class',
      price: 120
    }, {
      id: 2,
      title: 'Choose the radio station',
      price: 60
    }, {
      id: 3,
      title: 'Order Uber',
      price: 20
    }, {
      id: 4,
      title: 'Rent a car ',
      price: 200
    }
  ]
}
];

export const generatePoint = () => ({
  basePrice: getPrice(),
  dateFrom: getRandomDateFrom(),
  dateTo: getRandomDateTo(),
  destination: getRandomDestination(),
  isFavorite: Boolean(getRandomInteger(0, 1)),
  offers: getRandomOffers(),
  type: getRandomType(),
});
