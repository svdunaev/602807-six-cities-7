import {ActionCreator} from './action';
import {ApiRoute, AppRoute} from '../constants';
import {adaptOfferToClient, adaptReviewToClient, adaptUserInfoToClient} from '../utils/adapter';
import { api as apiInstance } from '../services/api';


const loadOffers = () => (dispatch, _getState, api) => (
  api.get(ApiRoute.OFFERS)
    .then(({data}) => data.map((offer) => adaptOfferToClient(offer)))
    .then((offers) => dispatch(ActionCreator.setOffers(offers)))
);

const checkAuth = () => (dispatch, _getState, api) => (
  api.get(ApiRoute.LOGIN)
    .then(({data}) => {
      dispatch(ActionCreator.login(adaptUserInfoToClient(data)));
    })
    .catch(() => {})
);

const getOfferById = (id) => (
  apiInstance.get(`${ApiRoute.OFFERS}/${id}`)
    .then(({data}) => adaptOfferToClient(data))
);

const getNearbyOffers = (id) => (
  apiInstance.get(`${ApiRoute.OFFERS}/${id}/nearby`)
    .then(({data}) => data.map((offer) => adaptOfferToClient(offer)))
);

const login = (authData) => (dispatch, _getState, api) => (
  api.post(ApiRoute.LOGIN, authData)
    .then(({data}) => {
      localStorage.setItem('token', data.token);
      dispatch(ActionCreator.login(adaptUserInfoToClient(data)));
    })
    .then(() => dispatch(ActionCreator.redirectToRoute(AppRoute.ROOT)))
);

const logout = () => (dispatch, _getState, api) => (
  api.delete(ApiRoute.LOGOUT)
    .then(() => localStorage.removeItem('token'))
    .then(() => dispatch(ActionCreator.logout()))
);

const getReviews = (offerId) => (_dispatch, _getState, api) => (
  api.get(`${ApiRoute.REVIEWS}/${offerId}`)
    .then(({data}) => data.map((review) => adaptReviewToClient(review)))
);

const postReview = (offerId, newReview) => (_dispatch, _getState, api) => (
  api.post(`${ApiRoute.REVIEWS}/${offerId}`, newReview)
    .then(({data}) => data.map((review) => adaptReviewToClient(review)))
);

export {loadOffers, checkAuth, login, logout, getReviews, postReview, getOfferById, getNearbyOffers};
