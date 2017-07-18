import React, { Component } from 'react';

export default class DashHeader extends Component {
  render() {
    return (
      <div>
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
        <ul className="dash-nav">
          <li className={`dash-item ${this.props.dashState === 'transaction' ? 'active-item' : ''}`}
            onClick={() => {this.props.onClick('transaction')}}>
            Transactions
          </li>
          <li className={`dash-item ${this.props.dashState === 'candidates' ? 'active-item' : ''}`}
            onClick={() => {this.props.onClick('candidates')}}>
            Candidates
          </li>
          <li className={`dash-item ${this.props.dashState === 'settings' ? 'active-item' : ''}`}
            onClick={() => {this.props.onClick('settings')}}>
            Settings
          </li>
        </ul>
      </div>
    );
  }
}
