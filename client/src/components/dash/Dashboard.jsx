import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Elements } from 'react-stripe-elements';
import * as actions from '../../actions/plaid';
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
      access_token: user.access_token,
      dashState: 'transaction'
    }
  }

  calculateSavedChange(transactions) {
    return transactions.reduce((acc, item) => {
      if (item.amount > 0) {
        return acc + (Math.ceil(item.amount) - item.amount);
      }
      return acc;
    }, 0);
  }

  setAccessToken(token) {
    this.setState({ access_token: token });
  }

  updateDash(tab) {
    this.setState({ dashState: tab });
  }

  render() {
    if (!this.state.user.customerId || !this.state.access_token) {
      return (
        <div>
          <SelectBank user={this.state.user} update={this.setAccessToken.bind(this)} />
          <div className="payment-container">
            <h3 className="payment-hdr">Setup your payment information.</h3>
            <Elements>
              <SetupPayments user={this.state.user} />
            </Elements>
          </div>
        </div>
      );
    } else if (this.state.access_token) {
      if (this.props.transactions) {
        return (
          <div className="dash-container">
            <DashStats user={this.state.user} savedChange={this.calculateSavedChange(this.props.transactions)} />
            <DashNav onClick={this.updateDash.bind(this)} dashState={this.state.dashState} />
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
    transactions: state.plaid.transactions
  };
}

export default connect(mapStateToProps, actions)(Dashboard);
