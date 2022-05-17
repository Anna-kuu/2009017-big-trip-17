import { generateOffer, generatePoint } from '../mock/point.js';

export default class PointsModel {
  #points = Array.from({length:0}, generatePoint);
  #offers = Array.from({length:1}, generateOffer);

  get points () {
    return this.#points;
  }

  get offers () {
    return this.#offers;
  }
}
