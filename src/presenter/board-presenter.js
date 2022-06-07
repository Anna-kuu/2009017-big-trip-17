import SortView from '../view/sort-view.js';
import TripListView from '../view/list-container-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import {remove, render} from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import {SortType, UpdateType, UserAction} from '../const.js';
import {sortByTime, sortByPrice} from '../utils/point.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #allDestinations = null;
  #tripListComponent = new TripListView();
  #sortComponent = null;
  #listEmptyComponent = new ListEmptyView();
  #boardOffers = [];
  #pointPresenter = new Map();
  #currentSortType = SortType.DEFAULT;

  constructor(boardContainer, pointsModel, allDestinations) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#allDestinations = allDestinations;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.TIME:
        return [...this.#pointsModel.points].sort(sortByTime);
      case SortType.PRICE:
        return [...this.#pointsModel.points].sort(sortByPrice);
    }
    return this.#pointsModel.points;
  }

  init = () => {
    this.#boardOffers = [...this.#pointsModel.offers];
    this.#renderBoard();
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);

    render(this.#sortComponent, this.#boardContainer);
  };

  #renderTripList = () => {
    render(this.#tripListComponent, this.#boardContainer);
    this.points.forEach((point) => this.#renderPoint(point,this.#boardOffers[0], this.#allDestinations));
  };

  #renderListEmpty = () => {
    render(this.#listEmptyComponent, this.#boardContainer);
  };

  #renderBoard = () => {
    const points = this.points;
    if (points.length === 0) {
      this.#renderListEmpty();
    } else {
      this.#renderSort();
      this.#renderTripList();
    }
  };

  #clearBoard = ({resetSortType = false} = {}) => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#listEmptyComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };

  #renderPoint = (point, allOffers, allDestinations) => {
    const pointPresenter = new PointPresenter(this.#tripListComponent.element, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point, allOffers, allDestinations);
    this.#pointPresenter.set(point.id, pointPresenter);
  };
}
