import React from 'react';

const DashNav = ({ dashState, onClick }) => (
  <ul className="dash-nav">
    <li className={`dash-item ${dashState === 'transaction' ? 'active-item' : ''}`}
      onClick={() => {onClick('transaction')}}>
      Transactions
    </li>
    <li className={`dash-item ${dashState === 'candidates' ? 'active-item' : ''}`}
      onClick={() => {onClick('candidates')}}>
      Candidates
    </li>
    <li className={`dash-item ${dashState === 'settings' ? 'active-item' : ''}`}
      onClick={() => {onClick('settings')}}>
      Settings
    </li>
  </ul>
);

export default DashNav;
