import React, { PureComponent } from "react";
import { Link } from "react-router";
import { HamburgerButton } from "react-hamburger-button";
import logoDark from "../../../assets/img/logo-dark.svg";
import logoLight from "../../../assets/img/logo-light.svg";
import "./style.css";

export class HeaderUI extends PureComponent {
  render() {
    const { theme, open, authenticated, signOut, hamburgerClick } = this.props;
    const logo = theme === "dark" ? logoDark : logoLight;

    return (
      <header className={`header header--${theme}`}>
        <div className="header__container">
          <div className="header__logo">
            <img className="logo__svg" alt="logo" src={logo} />
            <h3 className={`logo__text logo__text--${theme}`}>
              <Link to={authenticated ? "/dashboard" : "/"}>bluecent</Link>
            </h3>
          </div>
          <nav className="header__nav">
            <ul className="nav">
              <li className={`nav__item nav__item--${theme}`}>
                <Link to="/faq">FAQ</Link>
              </li>
              <li className={`nav__item nav__item--${theme}`}>
                <a href="https://github.com/rkrishnan8594/bluecent">Open Source</a>
              </li>
              {authenticated ? (
                <li className={`nav__login nav__login--${theme}`} onClick={signOut}>
                  <Link to="#">Sign Out</Link>
                </li>
              ) : (
                <li className={`nav__login nav__login--${theme}`}>
                  <Link to="/login">Login</Link>
                </li>
              )}
            </ul>
          </nav>
          <div className="header__hamburger">
            <HamburgerButton
              open={open}
              onClick={hamburgerClick}
              width={24}
              height={12}
              strokeWidth={3}
              color={theme === "dark" ? "#fff" : "#0c1c5e"}
              animationDuration={0.2}
            />
            {open && (
              <nav className={`burger__nav burger__nav--${theme}`}>
                <ul>
                  <li className={`burger__item burger__item--${theme}`}>
                    <Link to="/faq">FAQ</Link>
                  </li>
                  <li className={`burger__item burger__item--${theme}`}>
                    <a href="https://github.com/rkrishnan8594/bluecent">Open Source</a>
                  </li>
                  {authenticated ? (
                    <li className={`burger__item burger__item--${theme}`} onClick={signOut}>
                      <Link to="#">Sign Out</Link>
                    </li>
                  ) : (
                    <li className={`burger__item burger__item--${theme}`}>
                      <Link to="/login">Login</Link>
                    </li>
                  )}
                </ul>
              </nav>
            )}
          </div>
        </div>
      </header>
    );
  }
}
