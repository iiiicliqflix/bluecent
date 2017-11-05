import axios from 'axios';
import {
  STRIPE_SUCCESS,
  STRIPE_ERROR
} from './types';

const authorized = axios.create({
  headers: {
    'Authorization': JSON.parse(localStorage.getItem('user')).token
  }
});

export function setupPayments(token, user) {
  return function(dispatch) {
    authorized.post('/setup-payments', { token, user })
      .then((response) => {
        dispatch({ type: STRIPE_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: STRIPE_ERROR, payload: error });
        console.log(`Error setting up Stripe: ${error}`);
      });
  }
}
