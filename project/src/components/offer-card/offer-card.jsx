/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {Link} from 'react-router-dom';
import {OfferType} from '../../common-prop-types';

function OfferCard(props) {
  const {
    card: {name, price, rating, type, isPremium, isFavorite, previewImage, id},
    rootClassName,
    imageWrapperClassName,
    infoWrapperClassName,
    onHover,
  } = props;

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
  return (
    <article className={`place-card ${rootClassName}`}>
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`place-card__image-wrapper ${imageWrapperClassName}`}>
        <Link to={`/offer/${id}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img className="place-card__image" src={previewImage} style={{width: '260px', height: '200px'}} alt="Place" />
        </Link>
      </div>
      <div className={`place-card__info ${infoWrapperClassName}`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={
            `place-card__bookmark-button button ${isFavorite ? 'place-card__bookmark-button--active' : ''}`
          } type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: '80%'}}></span>
            <span className="visually-hidden">{rating}</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{name}</a>
        </h2>
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

OfferCard.propTypes = OfferType.isRequired;

export default OfferCard;
