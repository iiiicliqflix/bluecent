import React from "react";

const SelectBank = ({ displaySolo, getAccessToken }) => (
  <div className={`bank-container ${displaySolo ? "solo-bank" : ""}`}>
    <h2 className="bank-hdr">
      Connect your bank account to start tracking transactions.
    </h2>
    <button
      className="btn btn-bank"
      onClick={() => {
        getAccessToken();
      }}
    >
      Select Account
    </button>
  </div>
);

export default SelectBank;
