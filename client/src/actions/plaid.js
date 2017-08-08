import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  GET_TRANSACTIONS,
  ACCESS_TOKEN_SUCCESS,
  ACCESS_TOKEN_ERROR
} from './types';

export function getTransactions(access_token) {
  return function(dispatch) {
    axios.get('/get_transactions', { params: { access_token } })
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
        axios.post('/get_access_token', {
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ public_token: public_token, user: user })
        }).then((resp) => {
          return resp.json();
        }).then((data) => {
          dispatch({ type: ACCESS_TOKEN_SUCCESS, payload: data });
        }).catch((error) => {
          console.log('ERROR');
          dispatch({ type: ACCESS_TOKEN_ERROR, payload: error });
        })
      }
    });
    handler.open();
  }
}
