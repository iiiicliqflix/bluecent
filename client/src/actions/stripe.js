import axios from "axios";
import { STRIPE_SUCCESS, STRIPE_ERROR, UPDATE_STRIPE_SUCCESS, UPDATE_STRIPE_ERROR } from "./types";

export function setupPayments(token, user) {
  return dispatch => {
    axios.defaults.headers.common["Authorization"] = user.token;
    axios
      .post("/setup-payments", { token, user })
      .then(response => dispatch({ type: STRIPE_SUCCESS, payload: response.data }))
      .catch(error => dispatch({ type: STRIPE_ERROR, payload: error }));
  };
}

export function updatePayments(token, user) {
  return dispatch => {
    axios.defaults.headers.common["Authorization"] = user.token;
    axios
      .patch("/update-payments", { token, user })
      .then(() => dispatch({ type: UPDATE_STRIPE_SUCCESS }))
      .catch(error =>
        dispatch({
          type: UPDATE_STRIPE_ERROR,
          payload: error.response.data.error
        })
      );
  };
}
