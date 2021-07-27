import { SortType } from '../../constants';
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { ActionCreator } from '../../store/action';

function SortForm(props) {
  const {currentSortType, changeSortType} = props;
  const [isOpened, setIsOpened] = useState(null);
  const optionsListRef = useRef(null);

  useEffect(() => {
    const onDocumentClick = (evt) => {
      if (evt.target.parentElement !== optionsListRef.current) {
        setIsOpened(false);
      }
    };

    isOpened && document.addEventListener('click', onDocumentClick);

    return () => isOpened && document.removeEventListener('click', onDocumentClick);
  }, [isOpened]);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex="0" onClick={() => setIsOpened(!isOpened)}>
        {currentSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpened && 'places__options--opened'}`} ref={optionsListRef}>
        {
          Object
            .values(SortType)
            .map((sortType) => (
              <li
                key={sortType}
                className={`places__option ${sortType === currentSortType && 'places__option--active'}`}
                tabIndex="0"
                onClick={() => changeSortType(sortType)}
              >
                {sortType}
              </li>
            ))
        }
      </ul>
    </form>
  );
}

SortForm.propTypes = {
  currentSortType: PropTypes.string,
  changeSortType: PropTypes.func.isRequired,
};

const mapStateToProps = ({currentSortType}) => ({
  currentSortType,
});

const mapDispatchToProps = (dispatch) => ({
  changeSortType(sortType) {
    dispatch(ActionCreator.changeSortType(sortType));
  },
});

export {SortForm};
export default connect(mapStateToProps, mapDispatchToProps)(SortForm);
