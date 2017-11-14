import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Elements } from 'react-stripe-elements';
import * as actions from '../../actions';
import SetupPayments from '../account/SetupPayments';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.togglePaymentForm = this.togglePaymentForm.bind(this);
    this.state = { showPaymentForm: false };
  }

  togglePaymentForm() {
    let showPaymentForm = !this.state.showPaymentForm;
    this.setState({ showPaymentForm });
  }

  submitStripeToken(token) {
    this.props.setupPayments(token, this.props.user);
  }

  render() {
    const { user, updatePlaidItem } = this.props;

    if (!this.state.showPaymentForm) {
      return (
        <div className="settings">
          <div className="settings-container">
            <div className="setting">
              <label className="setting-label">Maximum Weekly Contribution</label>
              {(user.maxWeeklyContribution === -1) ?
                <input className="setting-input setting-num" type="number" placeholder="None" min="3"></input>
              :
                <input className="setting-input setting-num" type="number" value={user.maxWeeklyContribution} min="3"></input>
              }
            </div>
            <div className="setting">
              <label className="setting-label">Update Bank Account</label>
              <button
                className="setting-input setting-btn"
                onClick={() => {updatePlaidItem(publicToken)}}>
                Update Bank
              </button>
            </div>
            <div className="setting">
              <label className="setting-label">Update Payment Info</label>
              <button className="setting-input setting-btn" onClick={this.togglePaymentForm}>Update Payment</button>
            </div>
            <div className="setting">
              <label className="setting-label">Delete Account</label>
              <button className="setting-input setting-btn delete-btn">Delete</button>
            </div>
            <button className="settings-submit">Save</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="settings">
          <h2>Update Payment Info</h2>
          <Elements>
            <SetupPayments submitToken={this.submitStripeToken.bind(this)} />
          </Elements>
          <span className="settings-back-btn" onClick={this.togglePaymentForm}>Back</span>
        </div>
      );
    }
  }
}

export default connect(null, actions)(Settings);
