import FilterView from './view/filter-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import {render} from './framework/render.js';
import PointsModel from './model/points-model.js';
import { allDestinations } from './mock/destinations.js';

const tripMainElement = document.querySelector('.trip-main');
const filtersContainer = tripMainElement.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const boardPresenter = new BoardPresenter(tripEventsContainer, pointsModel, allDestinations);

render(new FilterView(), filtersContainer);
boardPresenter.init();
