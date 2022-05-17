import {createElement} from '../render.js';

const createListEmptyViewTemplate = () => (
  `<p class="trip-events__msg">Click New Event to create your first point</p>

  <!--
    Значение отображаемого текста зависит от выбранного фильтра:
      * Everthing – 'Click New Event to create your first point'
      * Past — 'There are no past events now';
      * Future — 'There are no future events now'.
  -->`
);

export default class ListEmptyView {
  #element = null;

  get template() {
    return createListEmptyViewTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
