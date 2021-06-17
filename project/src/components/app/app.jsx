import React from 'react';
import PropTypes from 'prop-types';
import HomePage from '../home-page/home-page';

function App(props) {
  const {offerCardsCount} = props;
  return (
    <HomePage offerCardsCount={offerCardsCount}></HomePage>
  );
}

App.propTypes = {
  offerCardsCount: PropTypes.number.isRequired,
};

export default App;
