import SortView from '../view/sort-view.js';
import TripListView from '../view/list-container-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import {render} from '../framework/render.js';
import PointPresenter from './point-presenter.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #tripListComponent = new TripListView();
  #sortComponent = new SortView();
  #listEmptyComponent = new ListEmptyView();
  #boardPoints = [];
  #boardOffers = [];

  constructor(boardContainer, pointsModel) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#boardPoints = [...this.#pointsModel.points];
    this.#boardOffers = [...this.#pointsModel.offers];
    this.#renderBoard();
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#boardContainer);
  };

  #renderTripList = () => {
    render(this.#tripListComponent, this.#boardContainer);
    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i], this.#boardOffers[0]);
    }
  };

  #renderListEmpty = () => {
    render(this.#listEmptyComponent, this.#boardContainer);
  };

  #renderBoard = () => {
    if (this.#boardPoints.length === 0) {
      this.#renderListEmpty();
    } else {
      this.#renderSort();
      this.#renderTripList();
    }
  };

  #renderPoint = (point, offers) => {
    const pointPresenter = new PointPresenter(this.#tripListComponent.element);
    pointPresenter.init(point, offers);
  };
}
