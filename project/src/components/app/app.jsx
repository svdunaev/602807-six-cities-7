import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import SinginPage from '../singin-page/signin-page';
import FavoritesPage from '../favorites-page/favorites-page';
import OfferPage from '../offer-page/offer-page';
import NotFoundPage from '../not-found-page/not-found-page';
import Main from '../main/main';
import { ReviewType } from '../../common-prop-types';
import LoadingScreen from '../loading-screen/loading-screen';
import { connect } from 'react-redux';
import {AppRoute, AuthorizationStatus} from '../../constants';
import browserHistory from '../../browser-history';

function App(props) {
  const {reviews, isDataLoaded, authorizationStatus} = props;
  const isCheckedAuthStatus = authorizationStatus !== AuthorizationStatus.UNKNOWN;

  if (!isDataLoaded || !isCheckedAuthStatus) {
    return (
      <LoadingScreen />
    );
  }
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route path={AppRoute.ROOT} exact component={Main}/>
        <Route
          path="/login"
          exact
          render={
            () => (authorizationStatus === AuthorizationStatus.NO_AUTH)
              ? <SinginPage />
              : <Redirect to={AppRoute.ROOT} />
          }
        />
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
  authorizationStatus: PropTypes.string,
};

const mapStateToProps = ({isDataLoaded, authorizationStatus}) => ({
  isDataLoaded,
  authorizationStatus,
});

export {App};
export default connect(mapStateToProps)(App);
