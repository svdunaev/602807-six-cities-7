import { ActionType } from './action';
import { CITIES } from '../constants';
import offers from '../mocks/offers';

const defaultCityOffers = offers.filter((offer) => offer.city.name === CITIES[3]);

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
    default:
      return state;
  }
};


export {reducer};
