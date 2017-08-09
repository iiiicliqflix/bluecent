import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore} from 'react-router-redux';
import { StripeProvider } from 'react-stripe-elements';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import routes from './routes';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const history = syncHistoryWithStore(browserHistory, store);

const user = JSON.parse(localStorage.getItem('user'));
if (user && user.token) {
  store.dispatch({ type: AUTH_USER, payload: user });
}

let apiKey = null;
if (process.env.NODE_ENV === 'production') {
  apiKey = 'pk_live_xvmsTnJOgZBGHRntb8kNTRYP';
} else {
  apiKey = 'pk_test_at49IUFDA9RttSjpq7zmrqId';
}

render(
  <Provider store={store}>
    <StripeProvider apiKey={apiKey}>
      <Router history={history} routes={routes} />
    </StripeProvider>
  </Provider>,
  document.getElementById('root')
);
