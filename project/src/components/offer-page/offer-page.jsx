import React, { useCallback, useEffect, useReducer, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import OffersList from '../offers-list/offers-list';
import Map from '../map/map';
import Header from '../header/header';
import ReviewsBoard from '../reviews-board/reviews-board';
import { getOfferById, getNearbyOffers, toggleFavoriteOffer, loadOffers } from '../../store/api-action';
import LoadingScreen from '../loading-screen/loading-screen';
import { getRatingInPercents } from '../../utils/common';
import { AppRoute, AuthorizationStatus, API_REFRESH_TIMEOUT } from '../../constants';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const IMAGES_MAX_COUNT = 6;
const NEARBY_OFFERS_MAX_COUNT = 3;

const initialState = {
  isFetching: true,
  isError: false,
  offer: null,
  nearbyOffers: [],
};

const reducer = (state, payload) => ({ ...state, ...payload });

function OfferPage(props) {
  const {fetchAllOffers, authorizationStatus} = props;
  const [
    { isFetching, isError, offer, nearbyOffers },
    dispatch,
  ] = useReducer(reducer, initialState);

  const {id} = useParams();

  const fetchOffers = useCallback(async () => {
    try {
      const [offerResult, nearbyOffersResult] = await Promise.all([getOfferById(id), getNearbyOffers(id)]);
      dispatch({
        isFetching: false,
        offer: offerResult,
        nearbyOffers: nearbyOffersResult,
      });
    } catch(err) {
      dispatch({
        isFetching: false,
        isError: true,
      });
    }
  }, [id]);

  const handleFavoriteToggle = useCallback(() => {
    fetchOffers();
  }, [fetchOffers]);

  useEffect(() => {
    fetchOffers();
  }, [fetchOffers]);

  const offersOnMap = useMemo(() => {
    let results = [offer];
    if (nearbyOffers.length > NEARBY_OFFERS_MAX_COUNT) {
      results = [...results, ...nearbyOffers.slice(0, NEARBY_OFFERS_MAX_COUNT)];
    } else {
      results = [...results, ...nearbyOffers];
    }
    return results;
  }, [nearbyOffers, offer]);

  const getImagesInGallery = () => {
    if (offer.images.length > IMAGES_MAX_COUNT) {
      return [...offer.images.slice(0, IMAGES_MAX_COUNT)];
    }
    return offer.images;
  };

  const history = useHistory();

  const handleFavoriteClick = useCallback(async (evt) => {
    evt.preventDefault();
    if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
      history.push(AppRoute.LOGIN);
    }
    await toggleFavoriteOffer(offer.id, Number(!offer.isFavorite));
    setTimeout(() => {
      fetchOffers();
      fetchAllOffers();
    }, API_REFRESH_TIMEOUT);
  }, [history, offer, authorizationStatus, fetchOffers, fetchAllOffers]);

  return (
    <React.Fragment>
      <Header />
      <div style={{display: 'none'}}>
        <svg xmlns="http://www.w3.org/2000/svg"><symbol id="icon-arrow-select" viewBox="0 0 7 4"><path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"></path></symbol><symbol id="icon-bookmark" viewBox="0 0 17 18"><path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path></symbol><symbol id="icon-star" viewBox="0 0 13 12"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"></path></symbol></svg>
      </div>

      {isFetching && (
        <LoadingScreen />
      )}

      {isError && (
        <div>Offer with id {id} not found</div>
      )}

      {!isError && !isFetching && (
        <div className="page">
          <main className="page__main page__main--property">
            <section className="property">
              <div className="property__gallery-container container">
                <div className="property__gallery">
                  {getImagesInGallery().map((image) => (
                    <div className="property__image-wrapper" key={image} >
                      <img className="property__image" src={image} alt="studio"/>
                    </div>
                  ))}
                </div>
              </div>
              <div className="property__container container">
                <div className="property__wrapper">
                  {offer.isPremium && (
                    <div className="property__mark">
                      <span>Premium</span>
                    </div>
                  )}
                  <div className="property__name-wrapper">
                    <h1 className="property__name">
                      {offer.title}
                    </h1>
                    <button className={`property__bookmark-button ${offer.isFavorite ?'property__bookmark-button--active' : ''} button`} type="button" onClick={handleFavoriteClick}>
                      <svg className="property__bookmark-icon" width="31" height="33">
                        <use xlinkHref="#icon-bookmark" />
                      </svg>
                      <span className="visually-hidden">To bookmarks</span>
                    </button>
                  </div>
                  <div className="property__rating rating">
                    <div className="property__stars rating__stars">
                      <span style={{width: `${getRatingInPercents(offer.rating)}%`}}/>
                      <span className="visually-hidden">Rating</span>
                    </div>
                    <span className="property__rating-value rating__value">{offer.rating}</span>
                  </div>
                  <ul className="property__features">
                    <li className="property__feature property__feature--entire">
                      {offer.type}
                    </li>
                    <li className="property__feature property__feature--bedrooms">
                      {offer.bedrooms} Bedrooms
                    </li>
                    <li className="property__feature property__feature--adults">
                   Max {offer.maxAdults} adults
                    </li>
                  </ul>
                  <div className="property__price">
                    <b className="property__price-value">&euro;{offer.price}</b>
                    <span className="property__price-text">&nbsp;night</span>
                  </div>
                  <div className="property__inside">
                    <h2 className="property__inside-title">What&apos;s inside</h2>
                    <ul className="property__inside-list">
                      {offer.goods.map((good) => (
                        <li className="property__inside-item" key={good}>
                          {good}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="property__host">
                    <h2 className="property__host-title">Meet the host</h2>
                    <div className="property__host-user user">
                      <div className={`property__avatar-wrapper ${offer.host.isPro && 'property__avatar-wrapper--pro'} user__avatar-wrapper`}>
                        <img className="property__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                      </div>
                      <span className="property__user-name">
                        {offer.host.name}
                      </span>
                      {offer.host.isPro && (
                        <span className="property__user-status">
                       Pro
                        </span>
                      )}
                    </div>
                    <div className="property__description">
                      <p className="property__text">
                        {offer.description}
                      </p>
                    </div>
                  </div>
                  <section className="property__reviews reviews">
                    <ReviewsBoard offerId={id}/>
                  </section>
                </div>
              </div>
              {nearbyOffers.length > 0 && (
                <section className="property__map map">
                  <Map
                    city={offer.city}
                    points={offersOnMap}
                    activeCard={offer}
                  />
                </section>
              )}
            </section>
            {nearbyOffers.length > 0 && (
              <div className="container">
                <section className="near-places places">
                  <h2 className="near-places__title">Other places in the neighbourhood</h2>
                  <div className="near-places__list places__list">
                    <OffersList
                      offers={nearbyOffers}
                      onFavoriteToggle={handleFavoriteToggle}
                    />
                  </div>
                </section>
              </div>
            )}
          </main>
        </div>
      )}
    </React.Fragment>
  );
}

OfferPage.propTypes = {
  authorizationStatus: PropTypes.string,
  fetchAllOffers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllOffers() {
    dispatch(loadOffers());
  },
});

export {OfferPage};
export default connect(mapStateToProps, mapDispatchToProps)(OfferPage);
