import React from 'react';
import {Router as BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import SinginPage from '../singin-page/signin-page';
import FavoritesPage from '../favorites-page/favorites-page';
import OfferPage from '../offer-page/offer-page';
import NotFoundPage from '../not-found-page/not-found-page';
import Main from '../main/main';
import LoadingScreen from '../loading-screen/loading-screen';
import { connect } from 'react-redux';
import {AppRoute, AuthorizationStatus} from '../../constants';
import browserHistory from '../../browser-history';
import PrivateRoute from '../private-route/private-route';

function App(props) {
  const {isDataLoaded, authorizationStatus, isAppError} = props;
  const isCheckedAuthStatus = authorizationStatus !== AuthorizationStatus.UNKNOWN;

  if (isAppError) {
    return <div>Api unavailable</div>;
  }

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
        <PrivateRoute
          exact
          path={AppRoute.FAVORITES}
          render={() => <FavoritesPage/>}
        />
        <Route path={`${AppRoute.OFFER}/:id`}>
          <OfferPage/>
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

App.propTypes = {
  isDataLoaded: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  isAppError: PropTypes.bool.isRequired,
};

const mapStateToProps = ({isDataLoaded, authorizationStatus, isAppError}) => ({
  isDataLoaded,
  authorizationStatus,
  isAppError,
});

export {App};
export default connect(mapStateToProps)(App);
