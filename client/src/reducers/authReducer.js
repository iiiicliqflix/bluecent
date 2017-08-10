import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  AUTH_USER,
  LOGIN_FAILURE,
  VERIFY_ACCOUNT_FAILURE,
  UNAUTH_USER,
  ACCESS_TOKEN_SUCCESS,
  ACCESS_TOKEN_ERROR,
  STRIPE_SUCCESS,
  STRIPE_ERROR
} from '../actions/types';

export default function(state = {}, action) {
  let user = {};

  switch(action.type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signup: true,
        error: {}
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        signup: false,
        error: {
          signupResend: action.payload
        }
      };
    case AUTH_USER:
      return {
        ...state,
        authenticated: true,
        error: {},
        user: action.payload
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        error: {
          login: action.payload
        }
      };
    case VERIFY_ACCOUNT_FAILURE:
      return {
        ...state,
        signup: true,
        error: {
          verifyAccount: action.payload
        }
      };
    case UNAUTH_USER:
      return {
        ...state,
        authenticated: false,
        error: {}
      };
    case ACCESS_TOKEN_SUCCESS:
      user = state.user;
      user.hasAccessToken = true;

      return {
        ...state,
        user,
        error: {}
      };
    case ACCESS_TOKEN_ERROR:
      user = state.user;
      user.hasAccessToken = false;

      return {
        ...state,
        user,
        error: action.payload
      };
    case STRIPE_SUCCESS:
      user = state.user;
      user.hasCustomerId = true;

      return {
        ...state,
        hasCustomerId: true,
        error: {}
      };
    case STRIPE_ERROR:
      user = state.user;
      user.hasCustomerId = false;

      return {
        ...state,
        user,
        error: action.payload
      };
    default:
      return state;
  }
}
