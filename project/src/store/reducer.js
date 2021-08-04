import { ActionType } from './action';
import { CITIES, AuthorizationStatus, SortType } from '../constants';

const initialState = {
  currentCity: CITIES[3],
  offers: [],
  isDataLoaded: false,
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  userInfo: {},
  currentSortType: SortType.POPULAR,
  isAppError: false,
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
    case ActionType.SET_OFFERS_FAIL:
      return {
        ...state,
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
    case ActionType.SET_APP_ERROR:
      return {
        ...state,
        isAppError: true,
      };
    default:
      return state;
  }
};


export {reducer};
