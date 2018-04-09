import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { browserHistory } from "react-router";
import * as actions from "../../../actions";
import { DashboardUI } from "./ui";

class DashboardContainer extends Component {
  static propTypes = {
    authenticated: PropTypes.bool,
    user: PropTypes.object.isRequired,
    getTransactions: PropTypes.func.isRequired,
    updatePlaidItem: PropTypes.func.isRequired,
    publicToken: PropTypes.string
  };

  static defaultProps = {
    authenticated: false,
    publicToken: null
  };

  constructor(props) {
    super(props);
    this.updateTab = this.updateTab.bind(this);
    this.updateToken = this.updateToken.bind(this);
    this.state = { tab: "transactions" };
  }

  componentWillMount() {
    const { authenticated, user } = this.props;

    if (authenticated) {
      if (!user.hasAccessToken || !user.hasCustomerId) {
        browserHistory.push("/setup-account");
      }
    }
  }

  componentDidMount() {
    const { user, getTransactions } = this.props;

    if (user.hasAccessToken) {
      getTransactions(user);
    }
  }

  updateTab(tab) {
    this.setState({ tab });
  }

  updateToken() {
    const { updatePlaidItem, publicToken } = this.props;
    updatePlaidItem(publicToken);
  }

  render() {
    const { tab } = this.state;
    return <DashboardUI tab={tab} updateTab={this.updateTab} updateToken={this.updateToken} {...this.props} />;
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    authenticated: state.user.authenticated,
    user: state.user.user,
    transactions: state.plaid.transactions,
    campaigns: state.campaign.campaigns,
    savedChange: state.plaid.savedChange,
    isDataLoaded: state.plaid.isDataLoaded,
    plaidError: state.plaid.plaidError,
    transactionsError: state.plaid.transactionsError,
    publicToken: state.plaid.publicToken
  };
}

export const Dashboard = connect(mapStateToProps, actions)(DashboardContainer);
