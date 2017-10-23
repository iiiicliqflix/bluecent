import { GET_TRANSACTIONS, TRANSACTIONS_ERROR } from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case GET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload.transactions,
        savedChange: action.payload.savedChange,
        isDataLoaded: true
      };
    case TRANSACTIONS_ERROR: {
      return {
        ...state,
        transactions: null,
        savedChange: null,
        isDataLoaded: false,
        transactionsError: true,
        publicToken: action.payload.public_token
      }
    }
    default:
      return state;
  }
}
