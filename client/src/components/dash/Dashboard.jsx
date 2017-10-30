import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as actions from '../../actions';
import DashStats from './DashStats';
import DashNav from './DashNav';
import TransactionTable from './TransactionTable';
import Candidates from './Candidates';
import Settings from './Settings';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    if (props.authenticated) {
      let user = props.user;
      if (user.hasAccessToken) {
        this.props.getTransactions(user);
      }
      this.state = { dashState: 'transaction' };
    }
  }

  componentWillMount() {
    if (this.props.authenticated) {
      const user = this.props.user;
      if (!user.hasAccessToken || !user.hasCustomerId) {
        browserHistory.push('/setup-account');
      }
    }
  }

  updateDash(tab) {
    this.setState({ dashState: tab });
  }

  render() {
    const {
      user,
      isDataLoaded,
      savedChange,
      transactions,
      transactionsError,
      updatePlaidItem,
      publicToken
    } = this.props;

    if (isDataLoaded) {
      return (
        <div className="dash-container">
          <DashStats
            user={user}
            savedChange={savedChange}
          />
          <DashNav
            onClick={this.updateDash.bind(this)}
            dashState={this.state.dashState}
          />
          {(this.state.dashState === 'transaction') ?
            <TransactionTable transactions={transactions} />
          : (this.state.dashState === 'candidates') ?
            <Candidates />
          :
            <Settings />
          }
        </div>
      );
    } else if (transactionsError) {
      return (
        <div className="dash-container">
          <h1 className="update-hdr">Refresh your online banking data.</h1>
          <button
            className="btn btn-bank"
            onClick={() => {updatePlaidItem(publicToken)}}>
            Update Account
          </button>
        </div>
      );
    } else {
      return (
        <div className="dash-container">
          <h1 className="dash-hdr">Loading...</h1>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    transactions: state.plaid.transactions,
    savedChange: state.plaid.savedChange,
    isDataLoaded: state.plaid.isDataLoaded,
    transactionsError: state.plaid.transactionsError,
    publicToken: state.plaid.publicToken,
    user: state.auth.user
  };
}

export default connect(mapStateToProps, actions)(Dashboard);
