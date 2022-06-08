import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import { allDestinations } from './mock/destinations.js';

const tripMainElement = document.querySelector('.trip-main');
const filtersContainer = tripMainElement.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const boardPresenter = new BoardPresenter(tripEventsContainer, pointsModel, allDestinations, filterModel);
const filterPresenter = new FilterPresenter(filtersContainer, filterModel, pointsModel);

filterPresenter.init();
boardPresenter.init();
