import React, { useState } from 'react';
import PropTypes from 'prop-types';
import OffersList from '../offers-list/offers-list';
import Map from '../map/map';
import CitiesList from '../cities-list/cities-list';
import OffersCountTitle from '../offers-count-title/offers-count-title';
import SortForm from '../sort-form/sort-form';
import { connect } from 'react-redux';
import { getSortedCityOffers } from '../../selectors/selectors';
import { OfferType } from '../../common-prop-types';

function HomePage(props) {
  const {offers, currentCity} = props;

  const [activeCard, setActiveCard] = useState(null);
  const onCardHover = (card) => {
    setActiveCard(card);
  };
  const isEmptyOffers = offers.length === 0;

  return (
    <React.Fragment>
      <div style={{display: 'none'}}>
        <svg xmlns="http://www.w3.org/2000/svg"><symbol id="icon-arrow-select" viewBox="0 0 7 4"><path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"></path></symbol><symbol id="icon-bookmark" viewBox="0 0 17 18"><path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path></symbol><symbol id="icon-star" viewBox="0 0 13 12"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"></path></symbol></svg>
      </div>

      <div className={`page page--gray page--main ${isEmptyOffers ? 'page__main--index-empty' : ''}`}>
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <section className="locations container">
              <CitiesList />
            </section>
          </div>
          <div className="cities">
            {isEmptyOffers && (
              <div className="cities__places-container cities__places-container--empty container">
                <section className="cities__no-places">
                  <div className="cities__status-wrapper tabs__content">
                    <b className="cities__status">No places to stay available</b>
                    <p className="cities__status-description">We could not find any property available at the moment in {currentCity} </p>
                  </div>
                </section>
                <div className="cities__right-section"></div>
              </div>
            )}
            {!isEmptyOffers && (
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <OffersCountTitle />
                  <SortForm />
                  <OffersList
                    offers={offers}
                    onHover={onCardHover}
                  />
                </section>
                <div className="cities__right-section">
                  <section className="cities__map map">
                    <Map
                      city={offers[0].city}
                      points={offers}
                      activeCard={activeCard}
                    />
                  </section>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </React.Fragment>
  );
}

HomePage.propTypes = {
  offers: PropTypes.arrayOf(OfferType),
  currentCity: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  offers: getSortedCityOffers(state),
  currentCity: state.currentCity,
});

export {HomePage};
export default connect(mapStateToProps)(HomePage);
