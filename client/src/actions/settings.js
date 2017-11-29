import axios from 'axios';
import { browserHistory } from 'react-router';
import { SAVE_SETTINGS, UPDATE_BANK_ACCOUNT, UNAUTH_USER } from './types';

function setAuthorizationToken(token) {
  axios.defaults.headers.common['Authorization'] = token;
}

export function deleteAccount(user) {
  return function(dispatch) {
    setAuthorizationToken(user.token);
    axios.delete('/delete_account', { data: { user } })
      .then((response) => {
        localStorage.clear();
        browserHistory.push('/');
        dispatch({ type: UNAUTH_USER });
      });
  }
}

export function saveSettings(maxContribution, user) {
  return function(dispatch) {
    setAuthorizationToken(user.token);
    axios.
    dispatch({ type: SAVE_SETTINGS });
  }
}

export function updateBankAccount() {
  return function(dispatch) {
  }
}
