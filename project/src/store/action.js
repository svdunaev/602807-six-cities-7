const ActionType = {
  CHANGE_CITY: 'citySelect/changeCity',
  SET_OFFERS: 'citySelect/setOffers',
  CHANGE_ACTIVE_OFFER_ID: 'offerSelect/changeActiveOfferId',
  CHANGE_SORT_TYPE: 'sort/changeSortType',
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
};

export {ActionType, ActionCreator};
