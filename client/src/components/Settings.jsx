import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Elements } from 'react-stripe-elements';
import * as actions from '../actions';
import SetupPayments from '../components/SetupPayments';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.togglePaymentForm = this.togglePaymentForm.bind(this);
    this.saveSettings = this.saveSettings.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      showPaymentForm: false,
      maxContribution: props.user.maxWeeklyContribution
    };
  }

  togglePaymentForm() {
    let showPaymentForm = !this.state.showPaymentForm;
    this.setState({ showPaymentForm });
  }

  submitStripeToken(token) {
    this.props.setupPayments(token, this.props.user);
  }

  handleChange(event) {
    this.setState({maxContribution: event.target.value});
  }

  saveSettings(event) {
    event.preventDefault();
    this.props.saveSettings(this.state.maxContribution, this.props.user);
  }

  render() {
    const {
      user,
      deleteAccount,
      settingsError,
      settingsSuccess
    } = this.props;

    if (!this.state.showPaymentForm) {
      return (
        <div className="settings">
          <div className="settings-container">
            <form className="settings-form" onSubmit={this.saveSettings}>
              <div className="setting">
                <label className="setting-label">Maximum Weekly Contribution</label>
                {(this.state.maxContribution === -1) ?
                  <input className="setting-input setting-num" type="number" value="None" placeholder="None" min="3" onChange={this.handleChange}/>
                :
                  <input className="setting-input setting-num" type="number" value={this.state.maxContribution} min="3" onChange={this.handleChange}/>
                }
              </div>
              {/*
              <div className="setting">
                <label className="setting-label">Update Bank Account</label>
                <button
                  className="setting-input setting-btn"
                  onClick={() => {updateBankAccount()}}>
                  Update Bank
                </button>
              </div>
              */}
              <div className="setting">
                <label className="setting-label">Update Payment Info</label>
                <button className="setting-input setting-btn" onClick={this.togglePaymentForm}>Update Payment</button>
              </div>
              <div className="setting">
                <label className="setting-label">Delete Account</label>
                <button className="setting-input setting-btn delete-btn" onClick={() => {deleteAccount(user)}}>Delete</button>
              </div>
              <div className="settings-bottom">
                <button className="settings-submit" type="submit">Save</button>
                {
                  settingsSuccess ? <span className="settings-success">Success!</span> :
                  settingsError ? <span className="settings-error">Error.</span> :
                  null
                }
              </div>
            </form>
          </div>
        </div>
      );
    } else {
      return (
        <div className="settings">
          <h2 className="settings-payment-hdr">Update Payment Info</h2>
          <Elements>
            <SetupPayments submitToken={this.submitStripeToken.bind(this)} />
          </Elements>
          <span className="settings-back-btn" onClick={this.togglePaymentForm}>Back</span>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    settingsError: state.user.settingsError,
    settingsSuccess: state.user.settingsSuccess
  };
}

export default connect(mapStateToProps, actions)(Settings);
