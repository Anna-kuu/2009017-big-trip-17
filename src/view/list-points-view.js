import he from 'he';
import AbstractView from '../framework/view/abstract-view.js';
import { humanizePointEventDate, humanizePointTime, humanizePointDuration } from '../utils/point.js';

const createOffersTemplate = (offers, type, allOffers) => {
  const pointTypeOffer = allOffers.find((offer) => offer.type === type);
  let offerTemplate = '';
  if (pointTypeOffer.offers.length !== 0) {
    offerTemplate =  offers.map((offerId) => {
      const offerObject = pointTypeOffer.offers.find((element) => element.id === offerId);
      return (`<li class="event__offer">
      <span class="event__offer-title">${offerObject.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offerObject.price}</span>
      </li>`);
    }).join('');
  }
  return (`<ul class="event__selected-offers">
    ${offerTemplate}
  </ul>`);
};

const createEventsTemplate = (point, allOffers) => {
  const {basePrice, type, dateFrom, dateTo, isFavorite, offers, destination} = point;

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
      <h3 class="event__title">${type.charAt(0).toUpperCase() + type.slice(1)} ${he.encode(destination.name)}</h3>
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
      ${createOffersTemplate(offers, type, allOffers)}
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

export default class ListPointsView extends AbstractView {
  #point = null;
  #offers = null;

  constructor(point, offers) {
    super();
    this.#point = point;
    this.#offers = offers;
  }

  get template() {
    return createEventsTemplate(this.#point, this.#offers);
  }

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formEditClickHandler);
  };

  #formEditClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };
}
