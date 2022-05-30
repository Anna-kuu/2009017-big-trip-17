import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {humanizeEventTime} from '../utils/point.js';
import { TYPES } from '../const.js';

const BLANC_POINT = {
  basePrice: '',
  dateFrom: '2019-07-10T22:55:56.845Z',
  dateTo: '2019-07-11T11:22:13.375Z',
  destination: 'Geneva',
  type: 'taxi',
};

const createEventsTypeContainer = (currentType) => TYPES.map((type) =>
  `<div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}"${currentType === type ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type.charAt(0).toUpperCase() + type.slice(1)}</label>
  </div>`
).join('');

const createEventsOffersContainer = (point, allOffers) => {
  const pointTypeOffer = allOffers.find((offer) => offer.type === point.checkedType);
  let eventOffers = '';
  pointTypeOffer.offers.map((offer) => {
    const checked = point.offers.includes(offer.id) ? 'checked' : '';
    eventOffers += `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" ${checked}>
    <label class="event__offer-label" for="event-offer-luggage-1">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
  </div>`;
  });
  return eventOffers;
};

const createSelectDestinationTemplate = (destination, checkedType) => (
  `<div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-1">
    ${checkedType.charAt(0).toUpperCase() + checkedType.slice(1)}</label>
    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
    <datalist id="destination-list-1">
      <option value="Amsterdam"></option>
      <option value="Geneva"></option>
      <option value="Chamonix"></option>
    </datalist>
  </div>`
);

const createDestinationTemplate = (allDestinations, checkedDestination) => {
  const pointDestinationType = allDestinations.find((destination) => destination.name === checkedDestination);
  const pointDestinationPhoto = pointDestinationType.pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="Event photo">`).join('');

  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${pointDestinationType.description}</p>

      <div class="event__photos-container">
      <div class="event__photos-tape">
      ${pointDestinationPhoto}
      </div>
    </div>
    </section>`);
};

const createEditPointTemplate = (point = {}, allOffers, allDestinations) => {
  const {basePrice, dateFrom, dateTo, checkedDestination, checkedType} = point;

  const eventStartTime = humanizeEventTime(dateFrom);
  const eventEndTime = humanizeEventTime(dateTo);

  const selectDestinationTemplate = createSelectDestinationTemplate(checkedDestination, checkedType);
  const destinationTemplate = createDestinationTemplate(allDestinations, checkedDestination);


  return (
    `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${checkedType}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${createEventsTypeContainer(checkedType)}

                      </fieldset>
                    </div>
                  </div>
                  ${selectDestinationTemplate}



                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${eventStartTime}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${eventEndTime}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                    ${createEventsOffersContainer(point, allOffers)}
                    </div>
                  </section>

                  ${destinationTemplate}

                </section>
              </form>
            </li>`
  );
};

export default class EditPoint extends AbstractStatefulView {
  #offers = null;
  #destinations = null;

  constructor(point = BLANC_POINT, offers, destinations) {
    super();
    this._state = EditPoint.parsePointToState(point);
    this.#offers = offers;
    this.#destinations = destinations;

    this.#setInnerHandlers();
  }

  get template() {
    return createEditPointTemplate(this._state, this.#offers, this.#destinations);
  }

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setCloseFormClickHandler(this._callback.formClick);
  };

  reset = (point) => {
    this.updateElement(
      EditPoint.parsePointToState(point),
    );
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(EditPoint.parseStateToPoint(this._state));
  };

  setCloseFormClickHandler = (callback) => {
    this._callback.formClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formClickHandler);
  };

  #formClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.formClick();
  };

  #checkedTypeToggleHandler = (evt) => {
    evt.preventDefault();
    const newType = evt.target.parentNode.querySelector('.event__type-input').value;
    this.updateElement({
      checkedType: newType,
      offers: [],
    });
  };

  /*
  #offersToggleHandler = (evt) => {
    evt.preventDefault();
    console.log(this._state.offers.includes(getNumberFromString( evt.target.id )));
    const oldOffers = Object.values({...this._state.offers});
    console.log(evt.target.checked);
    if (evt.target.parentNode.querySelector('input').checked) {
      oldOffers.push(4);
      console.log(oldOffers);
      this.updateElement({
        offers: oldOffers,
      });
    }
    console.log({...this._state});
  };*/

  #changeDestinationHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      checkedDestination: evt.target.value,
    });
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-list').addEventListener('click', this.#checkedTypeToggleHandler);
    //this.element.querySelector('.event__available-offers').addEventListener('click', this.#offersToggleHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#changeDestinationHandler);
  };

  static parsePointToState = (point) => ({...point,
    checkedType: point.type,
    checkedDestination: point.destination,
  });

  static parseStateToPoint = (state) => {
    const point = {...state};

    point.type = point.checkedType;
    point.destination = point.checkedDestination;


    delete point.checkedType;
    delete point.checkedDestination;

    return point;
  };

}
