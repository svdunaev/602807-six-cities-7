/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import {OfferType} from '../../common-prop-types';
import OfferCard from '../offer-card/offer-card';


function FavLocationsItem(props) {
  const {cityName, cityOffers} = props;
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
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
          />),
        )}
      </div>
    </li>
  );
}

FavLocationsItem.propTypes = {
  cityName: PropTypes.string.isRequired,
  cityOffers: PropTypes.arrayOf(OfferType).isRequired,
};

export default FavLocationsItem;
