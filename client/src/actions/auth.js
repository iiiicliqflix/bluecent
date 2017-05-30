import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  AUTH_USER,
  LOGIN_FAILURE,
  VERIFY_ACCOUNT_FAILURE,
  UNAUTH_USER
} from './types';

export function authError(CONST, error) {
  return {
    type: CONST,
    payload: error,
  };
}

export function signupUser(props) {
  return function(dispatch) {
    axios.post('http://localhost:8000/signup', props)
      .then(() => {
        dispatch({ type: SIGNUP_SUCCESS });
        browserHistory.push(`/signup/verify-account?email=${props.email}`);
      })
      .catch(response => dispatch(authError(SIGNUP_FAILURE, response.data.error)));
  }
}

export function loginUser(props) {
  const { email, password } = props;

  return function(dispatch) {
    axios.post('http://localhost:8000/login', { email, password })
      .then(response => {
        localStorage.setItem('user', JSON.stringify(response.data));
        dispatch({ type: AUTH_USER });
        browserHistory.push('/dashboard');
      })
      .catch(() => dispatch(authError(LOGIN_FAILURE, "Email or password is invalid")));
  }
}

export function verifyAccount(props) {
  return function(dispatch) {
    axios.post('http://localhost:8000/signup/verify-account', props)
      .then(response => {
        localStorage.setItem('user', JSON.stringify(response.data));
        dispatch({ type: AUTH_USER });
        browserHistory.push('/dashboard');
      })
      .catch(response => {
        console.log(`RESPONSE: ${response}`);
        dispatch(authError(VERIFY_ACCOUNT_FAILURE, response.data.error));
      });
  }
}

export function signOut() {
  localStorage.clear();
  browserHistory.push('/');

  return {
    type: UNAUTH_USER,
  }
}
