/* eslint-disable no-console */
import React from 'react';
import { connect } from 'react-redux';
import { CITIES } from '../../constants';
import { ActionCreator } from '../../store/action';
import City from '../city/city';
import PropTypes from 'prop-types';

function CitiesList(props) {
  const {currentCity, changeCity} = props;
  console.log(props);
  return (
    <ul className="locations__list tabs__list">
      {
        CITIES.map((city) => (
          <City
            key={city}
            cityName={city}
            currentCity={currentCity}
            onClick={() => changeCity(city)}
          />
        ))
      }
    </ul>
  );
}

CitiesList.propTypes = {
  currentCity: PropTypes.string.isRequired,
  changeCity: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentCity: state.currentCity,
});

const mapDispatchToProps = (dispatch) => ({
  changeCity(city) {
    dispatch(ActionCreator.changeCity(city));
  },
});

export {CitiesList};
export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
