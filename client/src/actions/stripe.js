import axios from 'axios';
import { push } from 'react-router-redux';
import {
  STRIPE_SUCCESS,
  STRIPE_ERROR
} from './types';

export function setupPayments(token, user) {
  return function(dispatch) {
    axios.post('/setup-payments', {token, user})
      .then((response) => {
        dispatch({ type: STRIPE_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: STRIPE_ERROR, payload: error });
        console.log(`Error: ${error}`);
      });
  }
}

export function redirectToDashboard() {
  return function(dispatch) {
    dispatch(push('/dashboard'));
  }
}

export function redirectToSetupAccount() {
  return function(dispatch) {
    dispatch(push('/setup-account'));
  }
}
