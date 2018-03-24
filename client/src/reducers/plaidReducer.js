import { GET_TRANSACTIONS, TRANSACTIONS_ERROR, PLAID_ACCOUNT_ERROR } from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload.transactions,
        savedChange: action.payload.savedChange,
        isDataLoaded: true
      };
    case PLAID_ACCOUNT_ERROR:
      return {
        ...state,
        transactions: null,
        savedChange: null,
        isDataLoaded: true,
        plaidError: true,
        publicToken: action.payload.public_token
      };
    case TRANSACTIONS_ERROR:
      return {
        ...state,
        transactions: null,
        savedChange: null,
        isDataLoaded: true,
        transactionsError: true
      };
    default:
      return state;
  }
}
