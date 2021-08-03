import {createSelector} from 'reselect';
import { SortType } from '../../constants';

const getOffers = (state) => state.offers;
const getCurrentCity = (state) => state.currentCity;
const getSortType = (state) => state.currentSortType;

export const getCurrentCityOffers = createSelector(getCurrentCity, getOffers, (currentCity, offers) =>
  offers.filter(({city}) => city.name === currentCity),
);

export const getSortedCityOffers = createSelector(getCurrentCityOffers, getSortType, (currentOffers, sortType) =>
{
  switch (sortType) {
    case SortType.PRICE_LOW_TO_HIGH:
      return currentOffers.slice().sort((prevOffer, nextOffer) => prevOffer.price - nextOffer.price);

    case SortType.PRICE_HIGH_TO_LOW:
      return currentOffers.slice().sort((prevOffer, nextOffer) => nextOffer.price - prevOffer.price);

    case SortType.TOP_RATED_FIRST:
      return currentOffers.slice().sort((prevOffer, nextOffer) => nextOffer.rating - prevOffer.rating);

    default:
      return currentOffers;
  }
},
);
