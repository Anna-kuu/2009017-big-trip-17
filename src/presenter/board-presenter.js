//import NewPoint from '../view/add-new-point-view.js';
import SortView from '../view/sort-view.js';
import EditPoint from '../view/edit-point-view.js';
import EventsPoint from '../view/list-point-view.js';
import TripListView from '../view/list-container-view.js';
import {render} from '../render.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #tripListView = new TripListView();

  #boardPoints = [];
  #boardOffers = [];

  init = (boardContainer, pointsModel) => {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#boardPoints = [...this.#pointsModel.points];
    this.#boardOffers = [...this.#pointsModel.offers];

    render(new SortView(), this.#boardContainer);
    render(this.#tripListView, this.#boardContainer);
    //render(new EditPoint(this.#boardPoints[0], this.#boardOffers[0]), this.#tripListView.element);
    //render(new NewPoint(), this.tripListView.getElement());

    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i], this.#boardOffers[0]);
    }
  };

  #renderPoint = (point, offers) => {
    const pointComponent = new EventsPoint(point, offers);

    render (pointComponent, this.#tripListView.element);
  };
}
