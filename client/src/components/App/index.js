import React, { Component } from 'react';
import { Link } from 'react-router';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="hdr">Every cent counts.</h1>
        <div className="btns">
          <Link to="/sign-up">
            <button className="btn">Sign Up</button>
          </Link>
          <Link to="/login">
            <button className="btn">Login</button>
          </Link>
        </div>
      </div>
    );
  }
}
