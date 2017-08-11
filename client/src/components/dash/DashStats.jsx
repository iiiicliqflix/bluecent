import React, { Component } from 'react';

export default class DashStats extends Component {
  render() {
    return (
      <div className="dash-stats">
        <div className="dash-stat">
          <p className="stat-name">Total contributed.</p>
          <p className="stat-number">${this.props.user.total.toFixed(2)}</p>
        </div>
        <div className="dash-stat">
          <p className="stat-name">Amount saved this week.</p>
          <p className="stat-number">${this.props.savedChange.toFixed(2)}</p>
        </div>
        <div className="dash-stat">
          <p className="stat-name">Number of contributions.</p>
          <p className="stat-number">{this.props.user.numContribs}</p>
        </div>
      </div>
    );
  }
}
