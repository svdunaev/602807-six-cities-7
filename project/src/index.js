import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const OFFER_CARDS_COUNT = 5;

ReactDOM.render(
  <React.StrictMode>
    <App offerCardsCount = {OFFER_CARDS_COUNT}/>
  </React.StrictMode>,
  document.getElementById('root'));
