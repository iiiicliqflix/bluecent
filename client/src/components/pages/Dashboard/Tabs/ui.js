import React from "react";
import "./style.css";

export const TabsUI = ({ tab, updateTab }) => (
  <ul className="tabs">
    <li
      className={`tab ${tab === "transactions" ? "tab--active" : ""}`}
      onClick={() => updateTab("transactions")}
    >
      Transactions
    </li>
    <li
      className={`tab ${tab === "campaigns" ? "tab--active" : ""}`}
      onClick={() => updateTab("campaigns")}
    >
      Campaigns
    </li>
    <li
      className={`tab ${tab === "settings" ? "tab--active" : ""}`}
      onClick={() => updateTab("settings")}
    >
      Settings
    </li>
  </ul>
);
