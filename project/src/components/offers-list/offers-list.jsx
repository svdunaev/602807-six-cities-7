/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import OfferCard from '../offer-card/offer-card';
import {OfferType} from '../../common-prop-types';
import { connect } from 'react-redux';

function OffersList(props) {
  const {offers, onHover} = props;
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
        />
      ))}
    </div>
  );
}

OffersList.propTypes = {
  offers: PropTypes.arrayOf(OfferType).isRequired,
};

const mapStateToProps = (state) => ({
  offers: state.sortedCityOffers,
});


export {OffersList};
export default connect(mapStateToProps)(OffersList);
