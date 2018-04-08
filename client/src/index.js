import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { Router, browserHistory } from "react-router";
import { routerMiddleware, syncHistoryWithStore } from "react-router-redux";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import { StripeProvider } from "react-stripe-elements";
import reduxThunk from "redux-thunk";
import { rootReducer } from "./reducers";
import routes from "./routes";
import { AUTH_USER } from "./actions/types";

const createStoreWithMiddleware = applyMiddleware(routerMiddleware(browserHistory), reduxThunk)(createStore);
const persistedReducer = persistReducer({ key: "root", storage, blacklist: ["routing"] }, rootReducer);
const store = createStoreWithMiddleware(persistedReducer);
const persistor = persistStore(store);
const history = syncHistoryWithStore(browserHistory, store);

const user = JSON.parse(localStorage.getItem("user"));
if (user && user.token) {
  store.dispatch({ type: AUTH_USER, payload: user });
}

const testKey = "pk_test_at49IUFDA9RttSjpq7zmrqId";
const prodKey = "pk_live_xvmsTnJOgZBGHRntb8kNTRYP";
const apiKey = process.env.NODE_ENV === "production" ? prodKey : testKey;

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <StripeProvider apiKey={apiKey}>
        <Router history={history} routes={routes} />
      </StripeProvider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
