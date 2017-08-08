import {
  STRIPE_SUCCESS,
  STRIPE_ERROR
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case STRIPE_SUCCESS:
      return { ...state, stripeSetup: true, error: {} };
    case STRIPE_ERROR:
      return { ...state, stripeSetup: false, error: action.payload };
    default:
      return state;
  }
}
