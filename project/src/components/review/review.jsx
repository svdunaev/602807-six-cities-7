import React from 'react';
import { ReviewType } from '../../common-prop-types';
import {formatDate} from '../../utils/formatdate';
import { getRatingInPercents } from '../../utils/common';

const DateFormatTemplate = {
  STANDART: 'YYYY-MM-DD',
  HUMANIZE: 'MMMM YYYY',
};


function Review(props) {
  const {review} = props;
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={review.user.avatarUrl} width="54" height="54" alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">
          {review.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${getRatingInPercents(review.rating)}%`}}>&nbsp;</span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {review.comment}
        </p>
        <time className="reviews__time" dateTime={formatDate(review.date, DateFormatTemplate.STANDART)}>{formatDate(review.date, DateFormatTemplate.HUMANIZE)}</time>
      </div>
    </li>
  );
}

Review.propTypes = {
  review: ReviewType,
};

export default Review;
