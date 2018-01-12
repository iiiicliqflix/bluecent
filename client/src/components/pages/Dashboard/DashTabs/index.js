import React from "react";

const DashTabs = ({ dashState, onClick }) => (
  <ul className="dash-nav">
    <li
      className={`dash-item ${
        dashState === "transaction" ? "active-item" : ""
      }`}
      onClick={() => {
        onClick("transaction");
      }}
    >
      Transactions
    </li>
    <li
      className={`dash-item ${dashState === "campaigns" ? "active-item" : ""}`}
      onClick={() => {
        onClick("campaigns");
      }}
    >
      Campaigns
    </li>
    <li
      className={`dash-item ${dashState === "settings" ? "active-item" : ""}`}
      onClick={() => {
        onClick("settings");
      }}
    >
      Settings
    </li>
  </ul>
);

export default DashTabs;
