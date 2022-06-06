import Observable from '../framework/observable.js';
import { generateOffer, generatePoint } from '../mock/point.js';

export default class PointsModel extends Observable {
  #points = Array.from({length:10}, generatePoint);
  #offers = Array.from({length:1}, generateOffer);

  get points () {
    return this.#points;
  }

  get offers () {
    return this.#offers;
  }
}
