import { ActionType } from './action';
import { CITIES, AuthorizationStatus } from '../constants';

const initialState = {
  currentCity: CITIES[3],
  offers: [],
  currentCityOffers: [],
  sortedCityOffers: [],
  isDataLoaded: false,
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  userInfo: {},
  currentSortType: 'Popular',
};

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        currentCity: action.payload,
      };
    case ActionType.SET_OFFERS:
      return {
        ...state,
        offers: action.payload,
        isDataLoaded: true,
      };
    case ActionType.CHANGE_SORT_TYPE:
      return {
        ...state,
        currentSortType: action.payload,
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
