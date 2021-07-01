import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import HomePage from '../home-page/home-page';
import SinginPage from '../singin-page/signin-page';
import FavoritesPage from '../favorites-page/favorites-page';
import OfferPage from '../offer-page/offer-page';
import NotFoundPage from '../not-found-page/not-found-page';

function App(props) {
  const {offerCardsCount} = props;
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <HomePage offerCardsCount={offerCardsCount} />
        </Route>
        <Route path="/login" exact>
          <SinginPage />
        </Route>
        <Route path="/favorites" exact>
          <FavoritesPage />
        </Route>
        <Route path="/offer/:id">
          <OfferPage />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

App.propTypes = {
  offerCardsCount: PropTypes.number.isRequired,
};

export default App;
