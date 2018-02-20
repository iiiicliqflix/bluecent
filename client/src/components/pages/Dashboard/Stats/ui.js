import React from "react";
import "./style.css";

export const StatsUI = ({ user, savedChange }) => (
  <div className="stats">
    <div className="stat">
      <p className="stat__name">Total contributed.</p>
      <p className="stat__number">${user.total.toFixed(2)}</p>
    </div>
    <div className="stat">
      <p className="stat__name">Amount raised this week.</p>
      <p className="stat__number">${savedChange.toFixed(2)}</p>
    </div>
    <div className="stat">
      <p className="stat__name">Number of contributions.</p>
      <p className="stat__number">{user.numContribs}</p>
    </div>
  </div>
);
