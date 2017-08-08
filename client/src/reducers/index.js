import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import authReducer from './authReducer';
import plaidReducer from './plaidReducer';
import stripeReducer from './stripeReducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  plaid: plaidReducer,
  stripe: stripeReducer,
  routing: routerReducer
});

export default rootReducer;
