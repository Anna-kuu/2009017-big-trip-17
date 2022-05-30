import SortView from '../view/sort-view.js';
import TripListView from '../view/list-container-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import {render} from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import {updateItem} from '../utils/common.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #allDestinations = null;
  #tripListComponent = new TripListView();
  #sortComponent = new SortView();
  #listEmptyComponent = new ListEmptyView();
  #boardPoints = [];
  #boardOffers = [];
  #pointPresenter = new Map();

  constructor(boardContainer, pointsModel, allDestinations) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#allDestinations = allDestinations;
  }

  init = () => {
    this.#boardPoints = [...this.#pointsModel.points];
    this.#boardOffers = [...this.#pointsModel.offers];
    this.#renderBoard();
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#boardContainer);
  };

  #renderTripList = () => {
    render(this.#tripListComponent, this.#boardContainer);
    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i], this.#boardOffers[0], this.#allDestinations);
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

  #renderPoint = (point, allOffers, allDestinations) => {
    const pointPresenter = new PointPresenter(this.#tripListComponent.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point, allOffers, allDestinations);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #clearTripList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

}
