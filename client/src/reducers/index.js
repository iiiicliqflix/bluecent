import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as form } from "redux-form";
import authReducer from "./authReducer";
import plaidReducer from "./plaidReducer";
import settingsReducer from "./settingsReducer";

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  plaid: plaidReducer,
  routing: routerReducer,
  settings: settingsReducer
});

export default rootReducer;
