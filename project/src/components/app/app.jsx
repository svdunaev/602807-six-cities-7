import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import HomePage from '../home-page/home-page';
import SinginPage from '../singin-page/signin-page';
import Favorites from '../favorites/favorites';
import OfferPage from '../offer-page/offer-page';
import PageNotFound from '../page-not-found/page-not-found';

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
          <Favorites />
        </Route>
        <Route path="/offer/:id">
          <OfferPage />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

App.propTypes = {
  offerCardsCount: PropTypes.number.isRequired,
};

export default App;
