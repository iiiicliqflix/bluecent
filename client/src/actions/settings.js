import axios from "axios";
import { browserHistory } from "react-router";
import { SAVE_SETTINGS, UNAUTH_USER } from "./types";

function setAuthorizationToken(token) {
  axios.defaults.headers.common["Authorization"] = token;
}

export function deleteAccount(user) {
  return function(dispatch) {
    setAuthorizationToken(user.token);
    axios.delete("/delete_account", { data: { user } }).then(resp => {
      localStorage.clear();
      browserHistory.push("/");
      dispatch({ type: UNAUTH_USER });
    });
  };
}

export function saveSettings(maxContribution, user) {
  return function(dispatch) {
    setAuthorizationToken(user.token);
    axios
      .patch("/save_settings", { user, maxContribution })
      .then(resp => {
        dispatch({ type: SAVE_SETTINGS });
      })
      .catch(error => {
        //dispatch({ type: SAVE_SETTINGS_ERROR });
      });
  };
}

export function updateBankAccount() {
  return function(dispatch) {};
}
