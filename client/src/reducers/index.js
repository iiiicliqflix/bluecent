import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as form } from "redux-form";
import userReducer from "./userReducer";
import plaidReducer from "./plaidReducer";
import campaignReducer from "./campaignReducer";

export const rootReducer = combineReducers({
  form,
  user: userReducer,
  plaid: plaidReducer,
  campaign: campaignReducer,
  routing: routerReducer
});
