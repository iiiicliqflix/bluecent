import React from "react";
import PropTypes from "prop-types";
import "./style.css";

export const SelectBankUI = ({ displaySolo, getAccessToken }) => (
  <div className={`bank ${displaySolo ? "bank--solo" : ""}`}>
    <h2 className="bank__header">Connect your bank account to start tracking transactions.</h2>
    <button className="bank__button" onClick={getAccessToken}>
      Select Account
    </button>
  </div>
);

SelectBankUI.propTypes = {
  displaySolo: PropTypes.bool,
  getAccessToken: PropTypes.func.isRequired
};

SelectBankUI.defaultProps = {
  displaySolo: false
};
