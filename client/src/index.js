import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import App from './components/App';
import SignUp from './components/SignUp';
import Login from './components/Login';

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}/>
    <Route path="/sign-up" component={SignUp}/>
    <Route path="/login" component={Login}/>
  </Router>
), document.getElementById('root'));
