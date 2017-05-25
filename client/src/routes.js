import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="sign-up" component={SignUp}/>
    <Route path="login" component={Login}/>
  </Route>
)
