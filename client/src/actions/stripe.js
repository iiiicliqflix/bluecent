import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  STRIPE_SUCCESS,
  STRIPE_ERROR
} from './types';

export function setupPayments(token, user) {
  return function(dispatch) {
    axios.post('/setup-payments', {token, user})
      .then((response) => {
        dispatch({ type: STRIPE_SUCCESS, payload: response.data });
        browserHistory.push('/dashboard');
      })
      .catch((error) => {
        dispatch({ type: STRIPE_ERROR, payload: error });
        console.log(`Error: ${error}`);
      });
  }
}
