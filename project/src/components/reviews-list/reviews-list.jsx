/* eslint-disable react/no-array-index-key */
import React from 'react';
import Review from '../review/review';
import PropTypes from 'prop-types';
import { ReviewType } from '../../common-prop-types';

function ReviewsList(props) {
  const {reviews} = props;

  return (
    <React.Fragment>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length} </span></h2>
      <ul className="reviews__list">
        {reviews.map((review, id) => (
          <Review review={review} key={id} />
        ))}
      </ul>
    </React.Fragment>
  );
}

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(ReviewType).isRequired,
};

export default ReviewsList;
