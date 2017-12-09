import React from "react";
import { Route, IndexRoute } from "react-router";
import requireAuth from "./components/RequireAuth.jsx";
import requireNotAuth from "./components/RequireNotAuth.jsx";
import App from "./containers/App.jsx";
import Home from "./containers/Home.jsx";
import FAQ from "./containers/FAQ.jsx";
import SignUp from "./containers/SignUp.jsx";
import SignUpVerify from "./containers/SignUpVerify.jsx";
import VerifyAccount from "./containers/VerifyAccount.jsx";
import Login from "./containers/Login.jsx";
import SetupAccount from "./containers/SetupAccount";
import Dashboard from "./containers/Dashboard.jsx";

export default (
  <Route path="/" component={App}>
    <IndexRoute component={requireNotAuth(Home)} />
    <Route path="faq" component={FAQ} />
    <Route path="signup" component={requireNotAuth(SignUp)} />
    <Route path="login" component={requireNotAuth(Login)} />
    <Route
      path="signup/verify-account"
      component={requireNotAuth(SignUpVerify)}
    />
    <Route path="verify-account" component={requireNotAuth(VerifyAccount)} />
    <Route path="setup-account" component={requireAuth(SetupAccount)} />
    <Route path="dashboard" component={requireAuth(Dashboard)} />
  </Route>
);
