import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {reducer} from './store/reducer';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import { createApi } from './services/api';
import { loadOffers, logout, checkAuth } from './store/api-action';
import { redirect } from './store/middleware/redirect';
import { ActionCreator } from './store/action';

const api = createApi(
  () => store.dispatch(logout()),
  () => store.dispatch(ActionCreator.setAppError()),
);

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk.withExtraArgument(api)),
  applyMiddleware(redirect),
));

store.dispatch(checkAuth());
store.dispatch(loadOffers());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));

export {api};
