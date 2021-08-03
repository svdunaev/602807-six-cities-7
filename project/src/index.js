import React from 'react';
import ReactDOM from 'react-dom';
// import offers from './mocks/offers';
// import reviews from './mocks/reviews';
import App from './components/app/app';
import {reducer} from './store/reducer';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import { api } from './services/api';
import { loadOffers } from './store/api-action';
import reviews from './mocks/reviews';
import { redirect } from './store/middleware/redirect';

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk.withExtraArgument(api)),
  applyMiddleware(redirect),
));

store.dispatch(loadOffers());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App reviews={reviews}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
