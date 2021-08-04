import React, { useCallback, useEffect, useState, useMemo } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import FavLocationsItem from '../fav-locations-item/fav-locations-item';
import { connect } from 'react-redux';
import { fetchFavoriteOffers, loadOffers } from '../../store/api-action';
import LoadingScreen from '../loading-screen/loading-screen';
import Header from '../header/header';


function FavoritesPage(props) {
  const {fetchAllOffers} = props;
  const [isLoading, setIsLoading] = useState(true);
  const [favoriteOffers, setFavoriteOffers] = useState([]);

  const loadFavoriteOffers = useCallback(async () => {
    const offersData = await fetchFavoriteOffers();
    setIsLoading(false);
    setFavoriteOffers(offersData);
  }, []);

  const handleFavoriteToggle = useCallback(() => {
    loadFavoriteOffers();
    fetchAllOffers();
  }, [fetchAllOffers, loadFavoriteOffers]);

  const favoriteOffersByCity = useMemo(() => Object.entries(favoriteOffers.reduce((acc, offer) => {
    if (offer.isFavorite !== true) {
      return acc;
    }

    if (offer.city.name in acc) {
      acc[offer.city.name].push(offer);
    } else {
      acc[offer.city.name] = [offer];
    }

    return acc;
  }, [])), [favoriteOffers]);

  useEffect(() => {
    loadFavoriteOffers();
  }, [loadFavoriteOffers]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <React.Fragment>
      <Header />
      <div style={{display: 'none'}}>
        <svg xmlns="http://www.w3.org/2000/svg"><symbol id="icon-arrow-select" viewBox="0 0 7 4"><path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"></path></symbol><symbol id="icon-bookmark" viewBox="0 0 17 18"><path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path></symbol><symbol id="icon-star" viewBox="0 0 13 12"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"></path></symbol></svg>
      </div>

      <div className="page">
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            {favoriteOffersByCity.length === 0 && (
              <section className="favorites favorites--empty">
                <h1 className="visually-hidden">Favorites (empty)</h1>
                <div className="favorites__status-wrapper">
                  <b className="favorites__status">Nothing yet saved.</b>
                  <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
                </div>
              </section>
            )}
            {favoriteOffersByCity.length > 0 && (
              <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  {favoriteOffersByCity.map(([cityName, cityOffers]) => (
                    <FavLocationsItem
                      key={cityName}
                      cityName={cityName}
                      cityOffers={cityOffers}
                      onFavoriteToggle={handleFavoriteToggle}
                    />),
                  )}
                </ul>
              </section>
            )}
          </div>
        </main>
        <footer className="footer container">
          <Link to="/" className="footer__logo-link">
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
          </Link>
        </footer>
      </div>
    </React.Fragment>
  );
}
FavoritesPage.propTypes = {
  fetchAllOffers: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchAllOffers() {
    dispatch(loadOffers());
  },
});


export {FavoritesPage};
export default connect(null, mapDispatchToProps)(FavoritesPage);
