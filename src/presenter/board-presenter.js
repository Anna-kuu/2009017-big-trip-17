import NewPoint from '../view/add-new-point-view.js';
import SortView from '../view/sort-view.js';
import EditPoint from '../view/edit-point-view.js';
import EventsPoint from '../view/list-point-view.js';
import TripListView from '../view/list-container-view.js';
import {render} from '../render.js';

export default class BoardPresenter {
  tripListView = new TripListView();

  init = (boardContainer, pointsModel) => {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
    this.boardPoints = [...this.pointsModel.getPoints()];
    this.boardOffers = [...this.pointsModel.getOffers()];

    render(new SortView(), this.boardContainer);
    render(this.tripListView, this.boardContainer);
    render(new EditPoint(this.boardPoints[0], this.boardOffers[0].offers), this.tripListView.getElement());
    render(new NewPoint(), this.tripListView.getElement());

    for (let i = 1; i < this.boardPoints.length; i++) {
      render(new EventsPoint(this.boardPoints[i], this.boardOffers[0].offers), this.tripListView.getElement());
    }
  };
}
