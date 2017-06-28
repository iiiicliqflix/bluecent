import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/plaid';
import DashHeader from './DashHeader';
import TransactionTable from './TransactionTable';
import SelectBank from './SelectBank';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    let user = JSON.parse(localStorage.getItem('user'));
    this.props.getTransactions(user.access_token);
    this.state = {
      user,
      access_token: user.access_token
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

  render() {
    if (this.state.access_token) {
      if (this.props.transactions) {
        return (
          <div className="dash-container">
            <DashHeader
              user={this.state.user}
              savedChange={this.calculateSavedChange(this.props.transactions)} />
            <TransactionTable transactions={this.props.transactions} />
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
