import React, { Component } from 'react';
import { Link } from 'react-router';

export default class DashHeader extends Component {
  render() {
    return (
      <div>
        <div className="dash-stats">
          <div className="dash-stat">
            <p className="stat-name">Total contributed.</p>
            <p className="stat-number">${this.props.user.total}</p>
          </div>
          <div className="dash-stat">
            <p className="stat-name">Total saved this period.</p>
            <p className="stat-number">${this.props.savedChange.toFixed(2)}</p>
          </div>
          <div className="dash-stat">
            <p className="stat-name">Number of contributions.</p>
            <p className="stat-number">{this.props.user.weeks}</p>
          </div>
        </div>
        <ul className="dash-nav">
          <li className="dash-item active-item">
            <Link to="#">Transactions</Link>
          </li>
          <li className="dash-item">
            <Link to="#">Candidates</Link>
          </li>
          <li className="dash-item">
            <Link to="#">Settings</Link>
          </li>
        </ul>
      </div>
    );
  }
}
