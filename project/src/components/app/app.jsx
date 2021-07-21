import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import HomePage from '../home-page/home-page';
import SinginPage from '../singin-page/signin-page';
import FavoritesPage from '../favorites-page/favorites-page';
import OfferPage from '../offer-page/offer-page';
import NotFoundPage from '../not-found-page/not-found-page';
import { OfferType, ReviewType } from '../../common-prop-types';

function App(props) {
  const {cards, reviews} = props;
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <HomePage
            cards={cards}
          />
        </Route>
        <Route path="/login" exact>
          <SinginPage />
        </Route>
        <Route path="/favorites" exact>
          <FavoritesPage
            cards={cards}
          />
        </Route>
        <Route path="/offer/:id">
          <OfferPage
            cards={cards}
            reviews={reviews}
          />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

App.propTypes = {
  cards: PropTypes.arrayOf(OfferType),
  reviews: PropTypes.arrayOf(ReviewType).isRequired,
};

export default App;
