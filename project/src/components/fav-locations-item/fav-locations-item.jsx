
import React from 'react';
import PropTypes from 'prop-types';
import {OfferType} from '../../common-prop-types';
import OfferCard from '../offer-card/offer-card';

function FavLocationsItem(props) {
  const {cityName, cityOffers, onFavoriteToggle} = props;

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="/#">
            <span>{cityName}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {cityOffers.map((cardItem) => (
          <OfferCard
            key={cardItem.id}
            card={cardItem}
            rootClassName="favorites__card"
            imageWrapperClassName="favorites__image-wrapper"
            infoWrapperClassName="favorites__card-info"
            onFavoriteToggle={onFavoriteToggle}
          />),
        )}
      </div>
    </li>
  );
}

FavLocationsItem.propTypes = {
  cityName: PropTypes.string.isRequired,
  cityOffers: PropTypes.arrayOf(OfferType).isRequired,
  onFavoriteToggle: PropTypes.func.isRequired,
};

export default FavLocationsItem;
