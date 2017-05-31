import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Header extends Component {
  render() {
    return (
      <header>
        <h1 className="logo"><Link to="/">bluecent</Link></h1>
        <ul className="nav">
          <li className="nav-item"><Link to="/">FAQ</Link></li>
          <li className="nav-item"><Link to="/">Team</Link></li>
          <li className="nav-item"><Link to="/">Contact</Link></li>
          <li className="nav-item"><Link to="/">Contribute</Link></li>
          <li className="nav-item login"><Link to="/">Login</Link></li>
        </ul>
      </header>
    )
  }
}
