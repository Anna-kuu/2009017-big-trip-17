import { generateOffer, generatePoint } from '../mock/point.js';

export default class PointsModel {
  points = Array.from({length:10}, generatePoint);
  offers = Array.from({length:1}, generateOffer);

  getPoints = () => this.points;

  getOffers = () => this.offers;
}
