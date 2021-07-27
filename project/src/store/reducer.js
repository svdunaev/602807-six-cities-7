import { ActionType } from './action';
import { CITIES, SortType } from '../constants';
import offers from '../mocks/offers';

const defaultCityOffers = offers.filter((offer) => offer.city.name === CITIES[3]);

const sortCityOffers = (cityOffers, sortType) => {
  switch (sortType) {
    case SortType.PRICE_LOW_TO_HIGH:
      return cityOffers.slice().sort((prevOffer, nextOffer) => prevOffer.price - nextOffer.price);

    case SortType.PRICE_HIGH_TO_LOW:
      return cityOffers.slice().sort((prevOffer, nextOffer) => nextOffer.price - prevOffer.price);

    case SortType.TOP_RATED_FIRST:
      return cityOffers.slice().sort((prevOffer, nextOffer) => nextOffer.rating - prevOffer.rating);

    default:
      return cityOffers;
  }
};

const initialState = {
  currentCity: CITIES[3],
  offers: [],
  currentCityOffers: defaultCityOffers,
  sortedCityOffers: defaultCityOffers,
  activeOfferId: 0,
};

const reducer = (state = initialState, action) => {
  const currentCityOffers = offers.filter((offer) => offer.city.name === action.payload);

  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        currentCity: action.payload,
        defaultCityOffers: currentCityOffers,
        sortedCityOffers: currentCityOffers,
        activeOfferId: initialState.activeOfferId,
      };
    case ActionType.SET_OFFERS:
      return {
        ...state,
        offers: action.payload,
      };
    case ActionType.CHANGE_ACTIVE_OFFER_ID:
      return {
        ...state,
        activeOfferId: action.payload,
      };
    case ActionType.CHANGE_SORT_TYPE:
      return {
        ...state,
        currentSortType: action.payload,
        sortedCityOffers: sortCityOffers(state.sortedCityOffers, action.payload),
        defaultCityOffers: sortCityOffers(state.sortedCityOffers, action.payload),
      };
    default:
      return state;
  }
};


export {reducer};
