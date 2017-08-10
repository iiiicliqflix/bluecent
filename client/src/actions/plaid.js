import axios from 'axios';
import {
  GET_TRANSACTIONS,
  ACCESS_TOKEN_SUCCESS,
  ACCESS_TOKEN_ERROR
} from './types';

export function getTransactions(user) {
  return function(dispatch) {
    axios.get('/get_transactions', { params: { user } })
      .then((response) => {
        dispatch({ type: GET_TRANSACTIONS, payload: response.data });
      });
  }
}

export function getAccessToken(user) {
  return function(dispatch) {
    let handler = window.Plaid.create({
      clientName: 'BlueCent',
      env: 'development',
      key: '80aa88b8cce388ffc75efe840a5709',
      product: ['auth', 'transactions'],
      onSuccess: (public_token, metadata) => {
        axios.post('/get_access_token', { public_token, user })
          .then((response) => {
            dispatch({ type: ACCESS_TOKEN_SUCCESS, payload: response.data });
          })
          .catch((error) => {
            console.log('Error getting access token.');
            dispatch({ type: ACCESS_TOKEN_ERROR, payload: error });
          });
      }
    });
    handler.open();
  }
}
