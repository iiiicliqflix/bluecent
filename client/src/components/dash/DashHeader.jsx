import React, { Component } from 'react';

export default class DashHeader extends Component {
  render() {
    return (
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
    );
  }
}
