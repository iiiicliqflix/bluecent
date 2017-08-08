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
    let user = JSON.parse(localStorage.getItem('user'));
    if (user.access_token) {
      this.props.getTransactions(user.access_token);
    }
    this.state = {
      user,
      dashState: 'transaction'
    }
  }

  submitStripeToken(token) {
    this.props.setupPayments(token, this.state.user);
  }

  getAccessToken() {
    this.props.getAccessToken(this.state.user);
  }

  updateDash(tab) {
    this.setState({ dashState: tab });
  }

  render() {
    console.log(this.state);
    if (!this.state.user.customerId || !this.state.accessToken) {
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
    } else if (this.state.accessToken) {
      if (this.props.transactions) {
        return (
          <div className="dash-container">
            <DashStats
              user={this.state.user}
              savedChange={this.props.savedChange}
            />
            <DashNav
              onClick={this.updateDash.bind(this)}
              dashState={this.state.dashState}
            />
            {(this.state.dashState === 'transaction') ?
              <TransactionTable transactions={this.props.transactions} />
              : (this.state.dashState === 'candidates') ? <Candidates />
              : <Settings />
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
    } else {
      return (
        <SelectBank
          user={this.state.user}
          update={this.setAccessToken.bind(this)} />
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    transactions: state.plaid.transactions,
    savedChange: state.plaid.savedChange,
    accessToken: state.plaid.accessToken
  };
}

export default connect(mapStateToProps, actions)(Dashboard);
