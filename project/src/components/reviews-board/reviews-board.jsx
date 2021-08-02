import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReviewsList from '../reviews-list/reviews-list';
import ReviewForm from '../review-form/review-form';
import { getReviews } from '../../store/api-action';
import ReviewsLoadingScreen from '../reviews-loading-screen/reviews-loading-screen';

function ReviewsBoard(props) {
  const {offerId, loadReviews} = props;
  const [state, setState] = useState(
    {
      isLoading: true,
      reviews: [],
      isLoadingError: false,
    },
  );

  const {isLoading, reviews, isLoadingError} = state;

  useEffect(() => {
    loadReviews(offerId)
      .then((reviewsList) => setState(
        {
          isLoading: false,
          reviews: reviewsList,
          isLoadingError: false,
        },
      ))
      .catch(() => setState(
        {
          isLoading: false,
          reviews: [],
          isLoadingError: true,
        },
      ));
  }, [loadReviews, offerId]);

  if(isLoading) {
    return <ReviewsLoadingScreen />;
  }

  return (
    <section className="property__reviews reviews">
      <ReviewsList reviews={reviews} isLoadingError={isLoadingError} />
      <ReviewForm
        offerId={offerId}
        updateReviewsList={
          (update) => setState((prevState) => ({
            ...prevState,
            reviews: update,
            isLoadingError: false,
          }))
        }
      />
    </section>
  );
}

ReviewsBoard.propTypes ={
  offerId: PropTypes.string.isRequired,
  loadReviews: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  loadReviews(offerId) {
    return dispatch(getReviews(offerId));
  },
});

export {ReviewsBoard};
export default connect(null, mapDispatchToProps)(ReviewsBoard);
