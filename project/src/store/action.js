const ActionType = {
  CHANGE_CITY: 'citySelect/changeCity',
  SET_OFFERS: 'citySelect/setOffers',
  CHANGE_ACTIVE_OFFER_ID: 'offerSelect/changeActiveOfferId',
  CHANGE_SORT_TYPE: 'sort/changeSortType',
  LOGIN: 'user/login',
  LOGOUT: 'user/logout',
  REDIRECTTOROUTE: 'redirect/redirectToRoute',
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
  changeActiveOfferId: (id) => ({
    type: ActionType.CHANGE_ACTIVE_OFFER_ID,
    payload: id,
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
};

export {ActionType, ActionCreator};
