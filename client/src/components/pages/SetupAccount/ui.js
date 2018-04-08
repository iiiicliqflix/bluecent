import React from "react";
import PropTypes from "prop-types";
import { Elements } from "react-stripe-elements";
import { SelectBank } from "./SelectBank";
import { SetupPayments } from "../../shared/SetupPayments";
import "./style.css";

export const SetupAccountUI = ({ user, getAccessToken, submitStripeToken }) => {
  if (!user.hasAccessToken && !user.hasCustomerId) {
    return (
      <div className="setup-account">
        <SelectBank getAccessToken={getAccessToken} />
        <div className="payments">
          <h2 className="payments__header">Setup your payment information.</h2>
          <Elements>
            <SetupPayments submitToken={submitStripeToken} />
          </Elements>
        </div>
      </div>
    );
  } else if (user.hasAccessToken && !user.hasCustomerId) {
    return (
      <div className="payments--solo">
        <h3 className="payments__header">Setup your payment information.</h3>
        <Elements>
          <SetupPayments submitToken={submitStripeToken} />
        </Elements>
      </div>
    );
  }
  return (
    <div className="setup-account">
      <SelectBank getAccessToken={getAccessToken} displaySolo />
    </div>
  );
};

SetupAccountUI.propTypes = {
  user: PropTypes.object.isRequired, // eslint-disable-line
  getAccessToken: PropTypes.func.isRequired,
  submitStripeToken: PropTypes.func.isRequired
};
