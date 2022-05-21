import EditPoint from '../view/edit-point-view.js';
import EventsPoint from '../view/list-point-view.js';
import {render, replace, remove} from '../framework/render.js';

export default class PointPresenter {
  #pointListContainer = null;
  #pointComponent = null;
  #pointEditComponent = null;

  #point = null;
  #offers = null;

  constructor(pointListContainer) {
    this.#pointListContainer = pointListContainer;
  }

  init = (point, offers) => {
    this.#point = point;
    this.#offers = offers;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new EventsPoint(point, offers);
    this.#pointEditComponent = new EditPoint(point, offers);

    this.#pointComponent.setEditClickHandler(this.#handlerEditClick);
    this.#pointEditComponent.setCloseFormClickHandler(this.#handlerFormSubmit);
    this.#pointEditComponent.setFormSubmitHandler(this.#handlerCloseFormClick);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render (this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#pointListContainer.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#pointListContainer.contains(prevPointEditComponent.element)) {
      replace(this.#pointComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  };

  #replacePointToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#onEscKeyDownHandler);
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#onEscKeyDownHandler);
  };

  #onEscKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  #handlerEditClick = () => {
    this.#replacePointToForm();
  };

  #handlerFormSubmit = () => {
    this.#replaceFormToPoint();
  };

  #handlerCloseFormClick = () => {
    this.#replaceFormToPoint();
  };
}
