import TripInfoView from '../view/trip-info-view';
import {render, RenderPosition} from '../framework/render.js';

export default class TripInfoPresenter {
  #tripMainElement = null;
  #pointsModel = null;

  #tripInfoComponent = null;

  constructor (tripMainElement, pointsModel) {
    this.#tripMainElement = tripMainElement;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#tripInfoComponent = new TripInfoView(this.#pointsModel.points);
    render (this.#tripInfoComponent, this.#tripMainElement, RenderPosition.AFTERBEGIN);
  };
}
