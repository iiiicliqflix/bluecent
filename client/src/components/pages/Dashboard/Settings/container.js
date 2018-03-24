import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../actions";
import { SettingsUI } from "./ui";

class SettingsContainer extends Component {
  constructor(props) {
    super(props);
    this.togglePaymentForm = this.togglePaymentForm.bind(this);
    this.saveSettings = this.saveSettings.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitStripeToken = this.submitStripeToken.bind(this);
    this.state = {
      showPaymentForm: false,
      maxContribution: props.user.maxWeeklyContribution
    };
  }

  togglePaymentForm() {
    const { showPaymentForm } = this.state;
    this.setState({ showPaymentForm: !showPaymentForm });
  }

  submitStripeToken(token) {
    const { updatePayments, user } = this.props;
    updatePayments(token, user);
  }

  handleChange(event) {
    this.setState({ maxContribution: event.target.value });
  }

  saveSettings(event) {
    event.preventDefault();
    const { saveSettings, user } = this.props;
    const { maxContribution } = this.state;
    saveSettings(maxContribution, user);
  }

  render() {
    const { showPaymentForm, maxContribution } = this.state;
    return (
      <SettingsUI
        togglePaymentForm={this.togglePaymentForm}
        saveSettings={this.saveSettings}
        handleChange={this.handleChange}
        submitStripeToken={this.submitStripeToken}
        showPaymentForm={showPaymentForm}
        maxContribution={maxContribution}
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    settingsError: state.user.settingsError,
    settingsSuccess: state.user.settingsSuccess,
    updateStripeSuccess: state.user.updateStripeSuccess,
    updateStripeError: state.user.updateStripeError
  };
}

export const Settings = connect(mapStateToProps, actions)(SettingsContainer);
