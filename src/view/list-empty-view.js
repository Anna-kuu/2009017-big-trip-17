import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../const.js';

const NoPointTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.ERROR]: 'Something went wrong. Try again later.',
};

const createListEmptyViewTemplate = (filterType) => (
  `<p class="trip-events__msg">${NoPointTextType[filterType]}</p>`
);

export default class ListEmptyView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createListEmptyViewTemplate(this.#filterType);
  }
}
