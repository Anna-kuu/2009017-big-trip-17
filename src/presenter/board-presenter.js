import NewPoint from '../view/add-new-point-view.js';
import SortView from '../view/sort-view.js';
import EditPoint from '../view/edit-point-view.js';
import EventsPoint from '../view/list-point-view.js';
import TripListView from '../view/list-container-view.js';
import {render} from '../render.js';

export default class BoardPresenter {
  tripListView = new TripListView();

  init = (boardContainer) => {
    this.boardContainer = boardContainer;

    render(new SortView(), this.boardContainer);
    render(this.tripListView, this.boardContainer);
    render(new EditPoint(), this.tripListView.getElement());
    render(new NewPoint(), this.tripListView.getElement());

    for (let i = 0; i < 3; i++) {
      render(new EventsPoint(), this.tripListView.getElement());
    }
  };
}
