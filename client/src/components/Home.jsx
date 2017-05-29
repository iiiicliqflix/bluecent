import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Home extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="hdr">Every cent counts.</h1>
        <div className="btns">
          <Link to="/signup">
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
