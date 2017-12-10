import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as form } from "redux-form";
import userReducer from "./userReducer";
import plaidReducer from "./plaidReducer";

const rootReducer = combineReducers({
  form,
  user: userReducer,
  plaid: plaidReducer,
  routing: routerReducer
});

export default rootReducer;
