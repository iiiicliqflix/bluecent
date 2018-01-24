import React, { PureComponent } from "react";
import { Link } from "react-router";
import logo from "../../../assets/img/logo.svg";
import "./style.css";

export class HeaderUI extends PureComponent {
  render() {
    const { color, authenticated, signOut } = this.props;

    return (
      <header className={`header header--${color}`}>
        <div className="header__logo">
          <img className="logo__svg" alt="logo" src={logo} />
          <h3 className="logo__text">
            <Link to={authenticated ? "/dashboard" : "/"}>bluecent</Link>
          </h3>
        </div>
        <nav className="header__nav">
          <ul className="nav">
            <li className="nav__item">
              <Link to="/faq">FAQ</Link>
            </li>
            <li className="nav__item">
              <a href="https://github.com/rkrishnan8594/bluecent">Open Source</a>
            </li>
            {authenticated ? (
              <li className="nav__item nav__item--login" onClick={signOut}>
                <Link to="#" className="signout-link">
                  Sign Out
                </Link>
              </li>
            ) : (
              <li className="nav__item nav__item--login">
                <Link to="/login" className="login-link">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
    );
  }
}
