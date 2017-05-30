import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App.jsx';
import Home from './components/Home.jsx';
import SignUp from './components/SignUp.jsx';
import SignUpVerify from './components/SignUpVerify.jsx';
import VerifyAccount from './components/VerifyAccount.jsx';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="signup" component={SignUp}/>
    <Route path="login" component={Login}/>
    <Route path="signup/verify-account" component={SignUpVerify}/>
    <Route path="verify-account" component={VerifyAccount}/>
    <Route path="dashboard" component={Dashboard}/>
  </Route>
)
