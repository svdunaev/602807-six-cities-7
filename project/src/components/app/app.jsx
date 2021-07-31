import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import HomePage from '../home-page/home-page';
import SinginPage from '../singin-page/signin-page';
import FavoritesPage from '../favorites-page/favorites-page';
import OfferPage from '../offer-page/offer-page';
import NotFoundPage from '../not-found-page/not-found-page';
import Header from '../header/header';
import { ReviewType } from '../../common-prop-types';
import LoadingScreen from '../loading-screen/loading-screen';
import { connect } from 'react-redux';

function App(props) {
  const {reviews, isDataLoaded} = props;
  if (!isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/login" exact>
          <SinginPage />
        </Route>
        <Route path="/favorites" exact>
          <FavoritesPage />
        </Route>
        <Route path="/offer/:id">
          <OfferPage
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
  reviews: PropTypes.arrayOf(ReviewType),
  isDataLoaded: PropTypes.bool,
};

const mapStateToProps = ({isDataLoaded}) => ({
  isDataLoaded,
});

export {App};
export default connect(mapStateToProps)(App);
