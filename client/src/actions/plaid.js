import axios from "axios";
import {
  GET_TRANSACTIONS,
  PLAID_ACCOUNT_ERROR,
  TRANSACTIONS_ERROR,
  ACCESS_TOKEN_SUCCESS,
  ACCESS_TOKEN_ERROR
} from "./types";

function setAuthorizationToken(token) {
  axios.defaults.headers.common["Authorization"] = token;
}

export function getTransactions(user) {
  return dispatch => {
    setAuthorizationToken(user.token);
    axios
      .get("/get-transactions", { params: { email: user.email } })
      .then(response => {
        dispatch({ type: GET_TRANSACTIONS, payload: response.data });
      })
      .catch(error => {
        if (error.response.data.error.error_code === "ITEM_LOGIN_REQUIRED") {
          axios.get("/get-public-token", { params: { user } }).then(response => {
            dispatch({ type: PLAID_ACCOUNT_ERROR, payload: response.data });
          });
        } else {
          dispatch({ type: TRANSACTIONS_ERROR });
        }
      });
  };
}

export function getAccessToken(user) {
  return dispatch => {
    setAuthorizationToken(user.token);
    const handler = window.Plaid.create({
      clientName: "Bluecent",
      env: "development",
      key: "80aa88b8cce388ffc75efe840a5709",
      product: ["transactions"],
      onSuccess: (public_token, metadata) => {
        axios
          .post("/get-access-token", { public_token, user })
          .then(response => dispatch({ type: ACCESS_TOKEN_SUCCESS, payload: response.data }))
          .catch(error => dispatch({ type: ACCESS_TOKEN_ERROR, payload: error }));
      }
    });
    handler.open();
  };
}

export function updatePlaidItem(publicToken) {
  return () => {
    const handler = window.Plaid.create({
      clientName: "Bluecent",
      env: "development",
      key: "80aa88b8cce388ffc75efe840a5709",
      product: ["transactions"],
      token: publicToken,
      onSuccess: (public_token, metadata) => console.log("successful")
    });
    handler.open();
  };
}
