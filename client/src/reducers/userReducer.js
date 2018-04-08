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
  STRIPE_ERROR,
  SAVE_SETTINGS,
  SAVE_SETTINGS_ERROR,
  UPDATE_STRIPE_SUCCESS,
  UPDATE_STRIPE_ERROR
} from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signup: true,
        error: {
          ...state.error,
          signup: null
        }
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        signup: false,
        error: {
          ...state.error,
          signup: action.payload
        }
      };
    case AUTH_USER:
      return {
        ...state,
        authenticated: true,
        user: action.payload,
        error: {
          ...state.error,
          login: null
        }
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        authenticated: false,
        error: {
          ...state.error,
          login: action.payload
        }
      };
    case VERIFY_ACCOUNT_FAILURE:
      return {
        ...state,
        error: {
          ...state.error,
          verifyAccount: action.payload
        }
      };
    case UNAUTH_USER:
      return {
        ...state,
        authenticated: false
      };
    case ACCESS_TOKEN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: {
          ...state.error,
          accessToken: null
        }
      };
    case ACCESS_TOKEN_ERROR:
      return {
        ...state,
        error: {
          ...state.error,
          accessToken: action.payload
        }
      };
    case STRIPE_SUCCESS:
      return {
        ...state,
        user: action.payload
      };
    case STRIPE_ERROR:
      return {
        ...state,
        error: {
          ...state.error,
          stripe: action.payload
        }
      };
    case SAVE_SETTINGS:
      return {
        ...state,
        user: action.payload
      };
    case SAVE_SETTINGS_ERROR:
      return {
        ...state,
        error: {
          ...state.error,
          settings: action.payload
        }
      };
    case UPDATE_STRIPE_SUCCESS:
      return {
        ...state,
        error: {
          updateStripe: null
        }
      };
    case UPDATE_STRIPE_ERROR:
      return {
        ...state,
        error: {
          ...state.error,
          updateStripe: true
        }
      };
    default:
      return state;
  }
}
