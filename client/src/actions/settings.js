import axios from "axios";
import { browserHistory } from "react-router";
import { SAVE_SETTINGS, SAVE_SETTINGS_ERROR, UNAUTH_USER } from "./types";

function setAuthorizationToken(token) {
  axios.defaults.headers.common["Authorization"] = token;
}

export function deleteAccount(user) {
  return function(dispatch) {
    setAuthorizationToken(user.token);
    axios
      .delete("/delete-account", { user })
      .then(resp => {
        localStorage.clear();
        browserHistory.push("/");
        dispatch({ type: UNAUTH_USER });
      })
      .catch(error => {
        dispatch({
          type: SAVE_SETTINGS_ERROR,
          payload: error.response.data.error
        });
      });
  };
}

export function saveSettings(maxContribution, user) {
  return function(dispatch) {
    setAuthorizationToken(user.token);
    axios
      .patch("/save-settings", { user, maxContribution })
      .then(response => {
        localStorage.setItem("user", JSON.stringify(response.data));
        dispatch({ type: SAVE_SETTINGS, payload: response.data });
      })
      .catch(error => {
        dispatch({
          type: SAVE_SETTINGS_ERROR,
          payload: error.response.data.error
        });
      });
  };
}
