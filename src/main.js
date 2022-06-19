import {render} from './framework/render.js';
import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import NewPointButtonView from './view/new-point-button-view.js';
import PointsApiService from './points-api-service.js';

const AUTHORIZATION = 'Basic kdj47vn5655xnhgft5';
const END_POINT = 'https://17.ecmascript.pages.academy/big-trip';

const tripMainElement = document.querySelector('.trip-main');
const filtersContainer = tripMainElement.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const pointsModel = new PointsModel(new PointsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();
const boardPresenter = new BoardPresenter(tripEventsContainer, pointsModel, filterModel, tripMainElement);
const filterPresenter = new FilterPresenter(filtersContainer, filterModel, pointsModel);
const newPointButtonComponent = new NewPointButtonView();

const handleNewPointFormClose = () => {
  newPointButtonComponent.element.disabled = false;
};

const handleNewPointButtonClick = () => {
  boardPresenter.createPoint(handleNewPointFormClose);
  newPointButtonComponent.element.disabled = true;
};

filterPresenter.init();
boardPresenter.init();
pointsModel.init().finally(() => {
  render(newPointButtonComponent, tripMainElement);
  if (!pointsModel.offers.length || !pointsModel.destinations.length) {
    newPointButtonComponent.element.disabled = true;
    return;
  }
  newPointButtonComponent.setClickHandler(handleNewPointButtonClick);
});
