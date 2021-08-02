import { SINGULAR_NUMBER } from '../../constants';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function OffersCountTitle(props) {
  const {offersCount, currentCity} = props;

  return (
    <>
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{`${offersCount} ${offersCount === SINGULAR_NUMBER ? 'place' : 'places'} to stay in ${currentCity}`}</b>
    </>
  );
}

OffersCountTitle.propTypes = {
  offersCount: PropTypes.number.isRequired,
  currentCity: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  offersCount: state.sortedCityOffers.length,
  currentCity: state.currentCity,
});

export {OffersCountTitle};
export default connect(mapStateToProps)(OffersCountTitle);
