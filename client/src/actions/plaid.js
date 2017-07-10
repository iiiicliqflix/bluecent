import axios from 'axios';
import { GET_TRANSACTIONS } from './types';

export function getTransactions(props) {
  return function(dispatch) {
    axios.get('/get_transactions', { params: { access_token: props } })
      .then((response) => {
        dispatch({ type: GET_TRANSACTIONS, payload: response.data.transactions });
      });
  }
}
