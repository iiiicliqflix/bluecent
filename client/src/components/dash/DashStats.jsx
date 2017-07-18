import React, { Component } from 'react';

export default class DashStats extends Component {
  render() {
    return (
      <div className="dash-stats">
        <div className="dash-stat stat-side">
          <p className="stat-name">Total contributed.</p>
          <p className="stat-number">${this.props.user.total}</p>
        </div>
        <div className="dash-stat stat-mid">
          <p className="stat-name">Amount saved since last contribution.</p>
          <p className="stat-number">${this.props.savedChange.toFixed(2)}</p>
          <a href={`https://secure.actblue.com/donate/bluecent?amount=${this.props.savedChange.toFixed(2)}`}>
            <button className="donate-btn">Contribute</button>
          </a>
        </div>
        <div className="dash-stat stat-side">
          <p className="stat-name">Number of contributions.</p>
          <p className="stat-number">{this.props.user.numContribs}</p>
        </div>
      </div>
    );
  }
}
