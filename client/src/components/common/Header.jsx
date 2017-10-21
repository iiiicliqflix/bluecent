import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';
import * as actions from '../../actions/auth';

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    if (['/faq', '/dashboard'].indexOf(this.props.location.pathname) >= 0) {
      this.state = { color: 'dark' };
    } else {
      this.state = { color: 'light' };
    }
  }

  componentWillReceiveProps() {
    let url = window.location.href;
    let currentRoute = url.substr(url.lastIndexOf('/') + 1);
    if (['faq', 'dashboard'].indexOf(currentRoute) < 0) {
      this.setState({ color: 'light' });
    } else {
      this.setState({ color: 'dark' });
    }
  }

  handleClick() {
    this.props.signOut();
  }

  render() {
    return (
      <header className={this.state.color}>
        <div className="header-content">
          <h1 className="logo">
            <Link to={this.props.authenticated ? '/dashboard' : '/'}>bluecent</Link>
          </h1>
          <ul className="nav">
            <li className="nav-item">
              <Link to="/faq">FAQ</Link>
            </li>
            <li className="nav-item">
              <a href="https://github.com/rkrishnan8594/bluecent">Open Source</a>
            </li>
            {this.props.authenticated ?
              <li className="nav-item login" onClick={this.handleClick}>
                <Link to="#" className="signout-link">Sign Out</Link>
              </li>
            :
              <li className="login">
                <Link to="/login" className="login-link">Login</Link>
              </li>
            }
          </ul>
        </div>
      </header>
    )
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps, actions)(withRouter(Header));
