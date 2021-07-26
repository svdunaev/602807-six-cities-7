import React from 'react';
import ReactDOM from 'react-dom';
import offers from './mocks/offers';
import reviews from './mocks/reviews';
import App from './components/app/app';
import {reducer} from './store/reducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';

const store = createStore(reducer, composeWithDevTools());


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        cards={offers}
        reviews={reviews}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
