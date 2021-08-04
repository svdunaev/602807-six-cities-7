import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {OfferType} from '../../common-prop-types';
import { getRatingInPercents } from '../../utils/common';
import { useHistory } from 'react-router';
import { AppRoute, AuthorizationStatus, API_REFRESH_TIMEOUT } from '../../constants';
import { toggleFavoriteOffer } from '../../store/api-action';
import { connect } from 'react-redux';


function OfferCard(props) {
  const {
    card: {price, rating, type, isPremium, isFavorite, previewImage, id, title},
    rootClassName,
    imageWrapperClassName,
    infoWrapperClassName,
    onHover,
    onFavoriteToggle,
    authorizationStatus,
  } = props;

  const putToFavorites = useCallback(async () => {
    await toggleFavoriteOffer(id, Number(!isFavorite));
    setTimeout(onFavoriteToggle, API_REFRESH_TIMEOUT);
  }, [id, isFavorite, onFavoriteToggle]);

  const history = useHistory();

  const handleMouseEnter = (evt) => {
    if (!onHover) {
      return;
    }
    onHover(props.card);
  };
  const handleMouseLeave = () => {
    if (!onHover) {
      return;
    }
    onHover(null);
  };

  const handleFavoriteClick = (event) => {
    event.preventDefault();
    if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
      history.push(AppRoute.LOGIN);
    }
    putToFavorites();
  };

  return (
    <article
      className={`place-card ${rootClassName}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`place-card__image-wrapper ${imageWrapperClassName}`}>
        <img className="place-card__image" src={previewImage} style={{width: '260px', height: '200px'}} alt="Place" />
      </div>
      <div className={`place-card__info ${infoWrapperClassName}`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${isFavorite ?'place-card__bookmark-button--active' : ''} button`} type="button" onClick={handleFavoriteClick}>
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${getRatingInPercents(rating)}%`}}></span>
            <span className="visually-hidden">{rating}</span>
          </div>
        </div>
        <Link to={`/offer/${id}`} >
          <h2 className="place-card__name">
            {title}
          </h2>
        </Link>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

OfferCard.defaultProps = {
  rootClassName: '',
  imageWrapperClassName: '',
  infoWrapperClassName: '',
};

OfferCard.propTypes = {
  card: OfferType,
  rootClassName: PropTypes.string,
  imageWrapperClassName: PropTypes.string,
  infoWrapperClassName: PropTypes.string,
  onHover: PropTypes.func,
  onFavoriteToggle: PropTypes.func,
  authorizationStatus: PropTypes.oneOf(Object.values(AuthorizationStatus)),
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus,
});

export {OfferCard};
export default connect(mapStateToProps)(OfferCard);
