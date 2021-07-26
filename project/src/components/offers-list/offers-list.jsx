/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import OfferCard from '../offer-card/offer-card';
import {OfferType} from '../../common-prop-types';
import { connect } from 'react-redux';

function OffersList(props) {
  const {cards, onHover} = props;
  return (
    <div className="cities__places-list places__list tabs__content">
      {cards.map((cardItem) => (
        <OfferCard
          key={cardItem.id}
          card={cardItem}
          rootClassName="cities__place-card"
          imageWrapperClassName="cities__image-wrapper"
          onHover={onHover}
          cards={cards}
        />
      ))}
    </div>
  );
}

OffersList.propTypes = {
  cards: PropTypes.arrayOf(OfferType).isRequired,
};

const mapStateToProps = (state) => ({
  cards: state.sortedCityOffers,
});


export {OffersList};
export default connect(mapStateToProps)(OffersList);
