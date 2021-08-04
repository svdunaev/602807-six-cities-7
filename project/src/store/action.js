const ActionType = {
  CHANGE_CITY: 'citySelect/changeCity',
  SET_OFFERS: 'citySelect/setOffers',
  SET_OFFERS_FAIL: 'citySelect/setOffersFail',
  CHANGE_SORT_TYPE: 'sort/changeSortType',
  LOGIN: 'user/login',
  LOGOUT: 'user/logout',
  REDIRECTTOROUTE: 'redirect/redirectToRoute',
  SET_COMMENTS: 'data/setComments',
  SET_APP_ERROR: 'app/setError',
};

const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city,
  }),
  setOffers: (offers) => ({
    type: ActionType.SET_OFFERS,
    payload: offers,
  }),
  setOffersFail: () => ({
    type: ActionType.SET_OFFERS_FAIL,
  }),
  setComments: (comments) => ({
    type: ActionType.SET_COMMENTS,
    payload: comments,
  }),
  changeSortType: (sortType) => ({
    type: ActionType.CHANGE_SORT_TYPE,
    payload: sortType,
  }),
  redirectToRoute: (url) => ({
    type: ActionType.REDIRECTTOROUTE,
    payload: url,
  }),
  login: (userInfo) => ({
    type: ActionType.LOGIN,
    payload: userInfo,
  }),
  logout: () => ({
    type: ActionType.LOGOUT,
  }),
  setAppError: () => ({
    type: ActionType.SET_APP_ERROR,
  }),
};

export {ActionType, ActionCreator};
