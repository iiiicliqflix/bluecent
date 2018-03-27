import React from "react";
import { Route, IndexRoute } from "react-router";
import { RequireAuth, RequireNotAuth } from "./components/hoc";
import {
  App,
  Home,
  FAQ,
  SignUp,
  Login,
  VerifyAccount,
  ConfirmAccount,
  Dashboard,
  SetupAccount
} from "./components/pages";

export default (
  <Route path="/" component={App}>
    <IndexRoute component={RequireNotAuth(Home)} />
    <Route path="faq" component={FAQ} />
    <Route path="signup" component={RequireNotAuth(SignUp)} />
    <Route path="login" component={RequireNotAuth(Login)} />
    <Route path="verify-account" component={RequireNotAuth(VerifyAccount)} />
    <Route path="confirm" component={RequireNotAuth(ConfirmAccount)} />
    <Route path="setup-account" component={RequireAuth(SetupAccount)} />
    <Route path="dashboard" component={RequireAuth(Dashboard)} />
  </Route>
);
