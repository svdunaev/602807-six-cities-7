import { ActionType } from './action';
import { CITIES, SortType, AuthorizationStatus } from '../constants';

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
  currentCityOffers: [],
  sortedCityOffers: [],
  activeOfferId: 0,
  isDataLoaded: false,
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  userInfo: {},
};

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        currentCity: action.payload,
        defaultCityOffers: state.offers.filter(({city}) => city.name === action.payload),
        sortedCityOffers: state.offers.filter(({city}) => city.name === action.payload),
        activeOfferId: initialState.activeOfferId,
      };
    case ActionType.SET_OFFERS:
      return {
        ...state,
        offers: action.payload,
        currentCityOffers: action.payload.filter(({city}) => city.name === initialState.currentCity),
        sortedCityOffers: action.payload.filter(({city}) => city.name === initialState.currentCity),
        isDataLoaded: true,
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
    case ActionType.LOGIN:
      return {
        ...state,
        authorizationStatus: AuthorizationStatus.AUTH,
        userInfo: action.payload,
      };
    case ActionType.LOGOUT:
      return {
        ...state,
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        userInfo: initialState.userInfo,
      };
    default:
      return state;
  }
};


export {reducer};
