import React, { PureComponent } from "react";
import { Link } from "react-router";
import screenshot from "../../../assets/img/screenshot.png";
import "./style.css";

export class HomeUI extends PureComponent {
  render() {
    return (
      <div className="home">
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
              <button className="home__button">How It Works</button>
            </a>
          </div>
        </div>
        <img className="home__screenshot" src={screenshot} alt="screenshot" />
      </div>
    );
  }
}
