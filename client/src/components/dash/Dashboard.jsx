import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Elements } from 'react-stripe-elements';
import * as actions from '../../actions';
import DashStats from './DashStats';
import DashNav from './DashNav';
import TransactionTable from './TransactionTable';
import Candidates from './Candidates';
import Settings from './Settings';
import SelectBank from './SelectBank';
import SetupPayments from './SetupPayments';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    let user = props.user;
    if (user.hasAccessToken) {
      this.props.getTransactions(user);
    }
    this.state = { dashState: 'transaction' };
  }

  submitStripeToken(token) {
    this.props.setupPayments(token, this.props.user);
  }

  getAccessToken() {
    this.props.getAccessToken(this.props.user);
  }

  updateDash(tab) {
    this.setState({ dashState: tab });
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
        <div className="payment-container">
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
    } else {
      if (this.props.transactions) {
        return (
          <div className="dash-container">
            <DashStats
              user={user}
              savedChange={this.props.savedChange}
            />
            <DashNav
              onClick={this.updateDash.bind(this)}
              dashState={this.state.dashState}
            />
            {(this.state.dashState === 'transaction') ?
              <TransactionTable transactions={this.props.transactions} />
            : (this.state.dashState === 'candidates') ?
              <Candidates />
            :
              <Settings />
            }
          </div>
        );
      }
      else {
        return (
          <div className="dash-container">
            <h1 className="dash-hdr">Loading...</h1>
          </div>
        );
      }
    }
  }
}

function mapStateToProps(state) {
  return {
    transactions: state.plaid.transactions,
    savedChange: state.plaid.savedChange,
    user: state.auth.user
  };
}

export default connect(mapStateToProps, actions)(Dashboard);
