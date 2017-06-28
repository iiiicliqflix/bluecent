import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/plaid';

class TransactionTable extends Component {
  constructor(props) {
    super(props);
    this.props.getTransactions(this.props.access_token);
  }

  render() {
    console.log(this.props.transactions);

    return (
      <p></p>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    access_token: ownProps.access_token,
    transactions: state.plaid.transactions
  };
}

export default connect(mapStateToProps, actions)(TransactionTable);
