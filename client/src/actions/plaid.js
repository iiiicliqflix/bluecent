import axios from 'axios';
import { browserHistory } from 'react-router';
import { GET_TRANSACTIONS } from './types';

export function getTransactions(access_token) {
  return function(dispatch) {
    axios.get('/get_transactions', { params: { access_token } })
      .then((response) => {
        dispatch({ type: GET_TRANSACTIONS, payload: response.data });
      });
  }
}

export function setupPayments(token, user) {
  return function(dispatch) {
    axios.post('/setup-payments', {token, user})
      .then(response => {
        browserHistory.push('/dashboard');
      })
      .catch(response => {
        console.log(`RESPONSE: ${response}`);
      });
  }
}
