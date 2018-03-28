import React, { Component } from "react";
import PropTypes from "prop-types";
import { Stats } from "./Stats";
import { Tabs } from "./Tabs";
import { Transactions } from "./Transactions";
import Campaigns from "./Campaigns";
import { Settings } from "./Settings";
import "./style.css";

export class DashboardUI extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired, // eslint-disable-line
    transactions: PropTypes.objectOf(PropTypes.array),
    campaigns: PropTypes.arrayOf(PropTypes.object),
    savedChange: PropTypes.number,
    tab: PropTypes.string.isRequired,
    isDataLoaded: PropTypes.bool,
    updateToken: PropTypes.func.isRequired,
    updateTab: PropTypes.func.isRequired
  };

  static defaultProps = {
    transactions: {},
    campaigns: [],
    savedChange: 0,
    isDataLoaded: false
  };

  static renderLoading() {
    return (
      <div className="dashboard">
        <h3 className="dashboard__loading">Loading...</h3>
      </div>
    );
  }

  static renderError() {
    return (
      <div className="dashboard">
        <h3 className="dashboard__loading">Error fetching your account info :(</h3>
      </div>
    );
  }

  renderUpdate() {
    const { updateToken } = this.props;

    return (
      <div className="dashboard">
        <h1 className="update-hdr">Refresh your online banking data.</h1>
        <button onClick={updateToken}>Update Account</button>
      </div>
    );
  }

  renderContent() {
    const { user, savedChange, transactions, campaigns, tab, updateTab } = this.props;

    return (
      <div className="dashboard">
        <Stats user={user} savedChange={savedChange} />
        <Tabs updateTab={updateTab} tab={tab} />
        {tab === "transactions" ? (
          <Transactions transactions={transactions} />
        ) : tab === "campaigns" ? (
          <Campaigns campaigns={campaigns} user={user} />
        ) : (
          <Settings user={user} />
        )}
      </div>
    );
  }

  render() {
    const { isDataLoaded, plaidError, transactionsError } = this.props;

    if (!isDataLoaded) {
      return this.constructor.renderLoading();
    } else if (plaidError) {
      return this.renderUpdate();
    } else if (transactionsError) {
      return this.constructor.renderError();
    }

    return this.renderContent();
  }
}
