/* eslint-disable no-console */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import ReviewsList from '../reviews-list/reviews-list';
import ReviewForm from '../review-form/review-form';
import PropTypes from 'prop-types';
import { OfferType, ReviewType } from '../../common-prop-types';
import OffersList from '../offers-list/offers-list';
import Map from '../map/map';
import { connect } from 'react-redux';


function OfferPage(props) {
  const {offers, reviews} = props;
  const {id} = useParams();
  console.log('offers', offers);
  const [offerCard] = offers.filter((card) => card.id === Number(id));
  console.log('offercard', offerCard);
  const nearOffers = offers.filter((nearCard) => nearCard.city.name === offerCard.city.name && nearCard !== offerCard);
  const CITY = nearOffers[0].city;

  const [activeCard, setActiveCard] = useState(null);
  const onCardHover = (card) => {
    setActiveCard(card);
  };

  if (!offerCard) {
    return (
      <div>
        Offer with id {id} not found
      </div>
    );
  }

  return (
    <React.Fragment>
      <div style={{display: 'none'}}>
        <svg xmlns="http://www.w3.org/2000/svg"><symbol id="icon-arrow-select" viewBox="0 0 7 4"><path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"></path></symbol><symbol id="icon-bookmark" viewBox="0 0 17 18"><path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path></symbol><symbol id="icon-star" viewBox="0 0 13 12"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"></path></symbol></svg>
      </div>

      <div className="page">
        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {offerCard.images.map((image) => (
                  <div className="property__image-wrapper" key={image}>
                    <img className="property__image" src={image} alt="Photo studio"/>
                  </div>
                ))}
              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                {offerCard.isPremium && (
                  <div className="property__mark">
                    <span>Premium</span>
                  </div>
                )}
                <div className="property__name-wrapper">
                  <h1 className="property__name">
                    {offerCard.title}
                  </h1>
                  <button
                    className={`property__bookmark-button button ${offerCard.isFavorite && 'property__bookmark-button--active'}`}
                    type="button"
                  >
                    <svg className="property__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark" />
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{width: '80%'}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">4.8</span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {offerCard.type}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {offerCard.bedrooms} Bedrooms
                  </li>
                  <li className="property__feature property__feature--adults">
                  Max {offerCard.maxAdults} adults
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">&euro;{offerCard.price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {offerCard.goods.map((good) => (
                      <li className="property__inside-item" key={good}>
                        {good}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div className={`property__avatar-wrapper ${offerCard.host.isPro && 'property__avatar-wrapper--pro'} user__avatar-wrapper`}>
                      <img className="property__avatar user__avatar" src={offerCard.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                    </div>
                    <span className="property__user-name">
                      {offerCard.host.name}
                    </span>
                    {offerCard.host.isPro && (
                      <span className="property__user-status">
                      Pro
                      </span>
                    )}
                  </div>
                  <div className="property__description">
                    <p className="property__text">
                      {offerCard.description}
                    </p>
                  </div>
                </div>
                <section className="property__reviews reviews">
                  <ReviewsList reviews={reviews}/>
                  <ReviewForm />
                </section>
              </div>
            </div>
            <section className="property__map map">
              <Map
                city={CITY}
                points={nearOffers}
                activeCard={activeCard}
              />
            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">
                <OffersList
                  offers={nearOffers}
                  onHover={onCardHover}
                />
              </div>
            </section>
          </div>
        </main>
      </div>
    </React.Fragment>
  );
}

OfferPage.propTypes = {
  offers: PropTypes.arrayOf(OfferType).isRequired,
  reviews: PropTypes.arrayOf(ReviewType),
};

const mapStateToProps = (state) => ({
  offers: state.sortedCityOffers,
});

export {OfferPage};
export default connect(mapStateToProps)(OfferPage);
