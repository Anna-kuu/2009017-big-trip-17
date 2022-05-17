import SortView from '../view/sort-view.js';
import EditPoint from '../view/edit-point-view.js';
import EventsPoint from '../view/list-point-view.js';
import TripListView from '../view/list-container-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import {render} from '../render.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #tripListView = new TripListView();
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

  #renderBoard = () => {
    if (this.#boardPoints.length === 0) {
      render(new ListEmptyView(), this.#boardContainer);
    } else {
      render(new SortView(), this.#boardContainer);
      render(this.#tripListView, this.#boardContainer);

      for (let i = 0; i < this.#boardPoints.length; i++) {
        this.#renderPoint(this.#boardPoints[i], this.#boardOffers[0]);
      }
    }
  };

  #renderPoint = (point, offers) => {
    const pointComponent = new EventsPoint(point, offers);
    const pointEditComponent = new EditPoint(point, offers);

    const replacePointToForm = () => {
      this.#tripListView.element.replaceChild(pointEditComponent.element, pointComponent.element);
    };

    const replaceFormToPoint = () => {
      this.#tripListView.element.replaceChild(pointComponent.element, pointEditComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render (pointComponent, this.#tripListView.element);
  };
}
