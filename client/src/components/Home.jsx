import React, { Component } from 'react';
import { Link } from 'react-router';
import screenshot from '../screenshot.png';

export default class Home extends Component {
  render() {
    return (
      <div className="container-home">
        <div className="cta">
          <h1 className="hdr">Every cent counts.</h1>
          <p className="sub-hdr">Automatically donate spare change to Democrats running for Congress in 2018.</p>
          <div className="btns">
            <Link to="/signup">
              <button>Get Started</button>
            </Link>
            <a href="/faq#how">
              <button>How It Works</button>
            </a>
          </div>
        </div>
        <img className="screenshot" src={screenshot} />
      </div>
    );
  }
}
