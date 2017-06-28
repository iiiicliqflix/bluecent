import React, { Component } from 'react';

export default class DashHeader extends Component {
  render() {
    return (
      <div>
        <div className="dash-stats">
          <div className="dash-stat">
            <p className="stat-number">${this.props.user.total}</p>
            <p className="stat-name">Total contributed.</p>
          </div>
          <div className="dash-stat">
            <p className="stat-number">${this.props.savedChange.toFixed(2)}</p>
            <p className="stat-name">Total saved this period.</p>
          </div>
          <div className="dash-stat">
            <p className="stat-number">{this.props.user.weeks}</p>
            <p className="stat-name">Number of weeks.</p>
          </div>
        </div>
      </div>
    );
  }
}
