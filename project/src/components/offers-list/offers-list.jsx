/* eslint-disable no-console */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import OfferCard from '../offer-card/offer-card';
import {OfferType} from '../../common-prop-types';
import { loadOffers } from '../../store/api-action';
import { connect } from 'react-redux';

function OffersList(props) {
  const {offers, onHover, fetchOffers, onFavoriteToggle} = props;

  const handleFavoriteToggle = useCallback(() => {
    fetchOffers();
    if (onFavoriteToggle) {
      onFavoriteToggle();
    }
  }, [fetchOffers, onFavoriteToggle]);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((cardItem) => (
        <OfferCard
          key={cardItem.id}
          card={cardItem}
          rootClassName="cities__place-card"
          imageWrapperClassName="cities__image-wrapper"
          onHover={onHover}
          offers={offers}
          onFavoriteToggle={handleFavoriteToggle}
        />
      ))}
    </div>
  );
}

OffersList.propTypes = {
  offers: PropTypes.arrayOf(OfferType).isRequired,
  onHover: PropTypes.func,
  fetchOffers: PropTypes.func.isRequired,
  onFavoriteToggle: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  fetchOffers() {
    dispatch(loadOffers());
  },
});

export {OffersList};
export  default connect(null, mapDispatchToProps)(OffersList);
