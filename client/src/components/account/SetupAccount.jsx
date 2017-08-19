import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Elements } from 'react-stripe-elements';
import * as actions from '../../actions';
import SelectBank from './SelectBank';
import SetupPayments from './SetupPayments';

class SetupAccount extends Component {
  constructor(props) {
    super(props);
    const user = props.user;
    if (user.hasAccessToken && user.hasCustomerId) {
      this.props.redirectToDashboard();
    }
  }

  componentWillReceiveProps() {
    const { user } = this.props;
    if (user.hasAccessToken && user.hasCustomerId) {
      this.props.redirectToDashboard();
    }
  }

  submitStripeToken(token) {
    this.props.setupPayments(token, this.props.user);
  }

  getAccessToken() {
    this.props.getAccessToken(this.props.user);
  }

  render() {
    const { user } = this.props;

    if (!user.hasCustomerId && !user.hasAccessToken) {
      return (
        <div>
          <SelectBank getAccessToken={this.getAccessToken.bind(this)} />
          <div className="payment-container">
            <h3 className="payment-hdr">Setup your payment information.</h3>
            <Elements>
              <SetupPayments submitToken={this.submitStripeToken.bind(this)} />
            </Elements>
          </div>
        </div>
      );
    } else if (user.hasAccessToken && !user.hasCustomerId) {
      return (
        <div className="payment-container solo-payment">
          <h3 className="payment-hdr">Setup your payment information.</h3>
          <Elements>
            <SetupPayments submitToken={this.submitStripeToken.bind(this)} />
          </Elements>
        </div>
      );
    } else if (!user.hasAccessToken && user.hasCustomerId) {
      return (
        <SelectBank
          getAccessToken={this.getAccessToken.bind(this)}
          displaySolo={true}
        />
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
}

export default connect(mapStateToProps, actions)(SetupAccount);
