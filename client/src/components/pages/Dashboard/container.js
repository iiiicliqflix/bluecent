import React, { Component } from "react";
import { connect } from "react-redux";
import { browserHistory } from "react-router";
import * as actions from "../../../actions";
import { DashboardUI } from "./ui";

class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.updateTab = this.updateTab.bind(this);
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
    const { user, getTransactions, getCampaigns } = this.props;

    if (user.hasAccessToken) {
      getTransactions(user);
    }

    getCampaigns();
  }

  updateTab(tab) {
    this.setState({ tab: tab });
  }

  render() {
    const { tab } = this.state;
    return <DashboardUI tab={tab} updateTab={this.updateTab} {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.user.authenticated,
    user: state.user.user,
    transactions: state.plaid.transactions,
    campaigns: state.campaign.campaigns,
    savedChange: state.plaid.savedChange,
    isDataLoaded: state.plaid.isDataLoaded,
    transactionsError: state.plaid.transactionsError,
    publicToken: state.plaid.publicToken
  };
}

export const Dashboard = connect(mapStateToProps, actions)(DashboardContainer);
