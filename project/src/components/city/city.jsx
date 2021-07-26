import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function City(props) {
  const {cityName, currentCity, onClick} = props;
  return (
    <li className="locations__item">
      <Link className={`locations__item-link tabs__item ${cityName === currentCity && 'tabs__item--active'}`} to="#" onClick={onClick}>
        <span>{cityName}</span>
      </Link>
    </li>
  );
}

City.propTypes = {
  cityName: PropTypes.string.isRequired,
  currentCity: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default City;
