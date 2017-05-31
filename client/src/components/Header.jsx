import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../actions/auth';

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.signOut();
  }

  render() {
    return (
      <header>
        <h1 className="logo"><Link to={this.props.authenticated ? '/dashboard' : '/'}>bluecent</Link></h1>
        <ul className="nav">
          <li className="nav-item"><Link to="/">FAQ</Link></li>
          <li className="nav-item"><a href="https://github.com/rkrishnan8594/BlueCent">Contribute</a></li>
          {this.props.authenticated ?
            <li className="nav-item login" onClick={this.handleClick}><Link to="#">Sign Out</Link></li>
          :
            <li className="nav-item login"><Link to="/login">Login</Link></li>
          }
        </ul>
      </header>
    )
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps, actions)(Header);
