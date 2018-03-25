import React, { PureComponent } from "react";
import { Link } from "react-router";
import screenshot from "../../../assets/img/screenshot.png";
import "./style.css";

export class HomeUI extends PureComponent {
  render() {
    return (
      <div className="home">
        <div className="home__section--1">
          <div className="section section--1">
            <div className="home__content">
              <h1 className="home__header">Every cent counts.</h1>
              <p className="home__sub-header">
                Automatically donate spare change to Democrats running for Congress in 2018.
              </p>
              <div className="home__buttons">
                <Link to="/signup">
                  <button className="home__button">Get Started</button>
                </Link>
                <a href="/faq#how">
                  <button className="home__button home__button--right">How It Works</button>
                </a>
              </div>
            </div>
            <img className="home__screenshot" src={screenshot} alt="screenshot" />
          </div>
        </div>
        <div className="home__section--2">
          <div className="section section--2">
            <ol className="home__list">
              <li>
                <p className="list__number">1</p>
                <p className="list__step">Connect your bank account.</p>
                <p className="list__details">
                  Securely link your online banking account from amongst hundreds of providers.
                </p>
              </li>
              <li>
                <p className="list__number">2</p>
                <p className="list__step">Select campaigns to support.</p>
                <p className="list__details">
                  Choose specific campaigns and candidates that you feel most passionate about.
                </p>
              </li>
              <li>
                <p className="list__number">3</p>
                <p className="list__step">Automatically donate spare change.</p>
                <p className="list__details">
                  Watch as Bluecent makes contributions every week and tracks your fundraising goals.
                </p>
              </li>
            </ol>
          </div>
        </div>
      </div>
    );
  }
}
