import React from 'react';
import ReactDOM from 'react-dom';
import offers from './mocks/offers';
import reviews from './mocks/reviews';
import App from './components/app/app';


ReactDOM.render(
  <React.StrictMode>
    <App
      cards={offers}
      reviews={reviews}
    />
  </React.StrictMode>,
  document.getElementById('root'));
