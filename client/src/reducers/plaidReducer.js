import {
  GET_TRANSACTIONS,
  ACCESS_TOKEN_SUCCESS,
  ACCESS_TOKEN_ERROR
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case GET_TRANSACTIONS:
      return { ...state, transactions: action.payload.transactions, savedChange: action.payload.savedChange };
    case ACCESS_TOKEN_SUCCESS:
      return { ...state, hasAccessToken: true, error: {} };
    case ACCESS_TOKEN_ERROR:
      return { ...state, hasAccessToken: false, error: action.payload };
    default:
      return state;
  }
}
