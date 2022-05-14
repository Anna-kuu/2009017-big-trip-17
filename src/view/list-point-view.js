import {createElement} from '../render.js';
import { humanizePointEventDate } from '../utils.js';
import { humanizePointTime } from '../utils.js';
import { humanizePointDuration } from '../utils.js';

const createEventsTemplate = (point, allOffers) => {
  const {basePrice, type, dateFrom, dateTo, isFavorite, offers, destination} = point;
  const pointTypeOffer = allOffers.find((offer) => offer.type === type);

  let offerTemplate = '<ul class="event__selected-offers">';

  offers.forEach((offerId) => {
    const offerObject = pointTypeOffer.offers.find((element) => element.id === offerId);
    console.log(offerObject);

    offerTemplate += `<li class="event__offer">
    <span class="event__offer-title">${offerObject.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offerObject.price}</span>
  </li>`;
  });
  offerTemplate += '</ul>';

  const eventDate = humanizePointEventDate(dateFrom);
  const startTime = humanizePointTime(dateFrom);
  const endTime = humanizePointTime(dateTo);
  const durationTime = humanizePointDuration(dateFrom, dateTo);

  const favoriteClassName = isFavorite
    ? 'event__favorite-btn event__favorite-btn--active'
    : 'event__favorite-btn';

  return (
    `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="2019-03-18">${eventDate}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type.charAt(0).toUpperCase() + type.slice(1)} ${destination}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30">${startTime}</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T11:00">${endTime}</time>
        </p>
        <p class="event__duration">${durationTime}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      ${offerTemplate}
      <button class="${favoriteClassName}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`);
};

export default class EventsPoint {
  #element = null;
  #point = null;
  #offers = null;

  constructor(point, offers) {
    this.#point = point;
    this.#offers = offers;
  }

  get template() {
    return createEventsTemplate(this.#point, this.#offers);
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
