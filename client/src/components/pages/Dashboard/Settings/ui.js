import React from "react";
import { SetupPayments } from "../../../shared/SetupPayments";
import "./style.css";

export const SettingsUI = props => {
  const {
    user,
    deleteAccount,
    settingsError,
    settingsSuccess,
    maxContribution,
    showPaymentForm,
    togglePaymentForm,
    handleChange,
    submitStripeToken,
    saveSettings,
    updateStripeSuccess,
    updateStripeError
  } = props;

  if (!showPaymentForm) {
    return (
      <div className="settings">
        <div className="settings-container">
          <form className="settings-form" onSubmit={saveSettings}>
            <div className="setting">
              <label className="setting-label">Maximum Weekly Contribution</label>
              {maxContribution === -1 ? (
                <input
                  className="setting-input setting-num"
                  type="number"
                  value="None"
                  placeholder="None"
                  min="3"
                  onChange={handleChange}
                />
              ) : (
                <input
                  className="setting-input setting-num"
                  type="number"
                  value={maxContribution}
                  min="3"
                  onChange={handleChange}
                />
              )}
            </div>
            <div className="setting">
              <label className="setting-label">Update Payment Info</label>
              <button className="setting-input setting-btn" onClick={togglePaymentForm}>
                Update Payment
              </button>
            </div>
            <div className="setting">
              <label className="setting-label">Delete Account</label>
              <button className="setting-input setting-btn delete-btn" onClick={() => deleteAccount(user)}>
                Delete
              </button>
            </div>
            <div className="settings-bottom">
              <button className="settings-submit" type="submit">
                Save
              </button>
              {settingsSuccess ? (
                <span className="settings-success">Success!</span>
              ) : settingsError ? (
                <span className="settings-error">Error.</span>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="settings">
      <h2 className="settings-payment-hdr">Update Payment Info</h2>
      <SetupPayments submitToken={submitStripeToken} />
      {updateStripeSuccess ? (
        <div className="settings-success--stripe">Success!</div>
      ) : updateStripeError ? (
        <div className="settings-error--stripe">Error.</div>
      ) : null}
      <span className="settings-back-btn" onClick={togglePaymentForm}>
        Back
      </span>
    </div>
  );
};
