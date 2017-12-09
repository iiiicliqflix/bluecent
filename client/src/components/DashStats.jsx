import React from 'react';

const DashStats = ({ user, savedChange }) => (
  <div className="dash-stats">
    <div className="dash-stat">
      <div className="stat-content">
        <p className="stat-name">Total contributed.</p>
        <p className="stat-number">${user.total.toFixed(2)}</p>
      </div>
    </div>
    <div className="dash-stat">
      <div className="stat-content">
        <p className="stat-name">Amount raised this week.</p>
        <p className="stat-number">${savedChange.toFixed(2)}</p>
      </div>
    </div>
    <div className="dash-stat">
      <div className="stat-content">
        <p className="stat-name">Number of contributions.</p>
        <p className="stat-number">{user.numContribs}</p>
      </div>
    </div>
  </div>
);

export default DashStats;
