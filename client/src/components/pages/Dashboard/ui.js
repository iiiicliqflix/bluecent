import React, { Component } from "react";
import { Stats } from "./Stats";
import { Tabs } from "./Tabs";
import { Transactions } from "./Transactions";
import Campaigns from "./Campaigns";
import { Settings } from "./Settings";
import "./style.css";

export class DashboardUI extends Component {
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

  renderUpdate() {
    const { updatePlaidItem, publicToken } = this.props;

    return (
      <div className="dashboard">
        <h1 className="update-hdr">Refresh your online banking data.</h1>
        <button onClick={() => updatePlaidItem(publicToken)}>Update Account</button>
      </div>
    );
  }

  renderLoading() {
    return (
      <div className="dashboard">
        <h3 className="dashboard__loading">Loading...</h3>
      </div>
    );
  }

  renderError() {
    return (
      <div className="dashboard">
        <h3 className="dashboard__loading">Error fetching your account info :(</h3>
      </div>
    );
  }

  render() {
    const { isDataLoaded, plaidError, transactionsError } = this.props;

    if (!isDataLoaded) {
      return this.renderLoading();
    } else if (plaidError) {
      return this.renderUpdate();
    } else if (transactionsError) {
      return this.renderError();
    }

    return this.renderContent();
  }
}
