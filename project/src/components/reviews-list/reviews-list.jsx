import React, { useMemo } from 'react';
import Review from '../review/review';
import PropTypes from 'prop-types';
import { ReviewType } from '../../common-prop-types';
import { compareDate } from '../../utils/formatdate';

const REVIEWS_MAX_COUNT = 10;

function ReviewsList(props) {
  const {reviews} = props;
  const sortedReviews = useMemo(() => {
    const resultReviews = reviews
      .slice()
      .sort((prevReview, nextReview) => compareDate(nextReview.date, prevReview.date));

    if (resultReviews.length > REVIEWS_MAX_COUNT) {
      return resultReviews.slice(0, REVIEWS_MAX_COUNT);
    }

    return resultReviews;
  }, [reviews]);

  return (
    <React.Fragment>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{sortedReviews.length} </span></h2>
      <ul className="reviews__list">
        {sortedReviews.map((review) => (
          <Review review={review} key={review.id} />
        ))}
      </ul>
    </React.Fragment>
  );
}

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(ReviewType).isRequired,
};

export default ReviewsList;
