import React, { Component } from "react";

export default class CampaignList extends Component {
  render() {
    const { campaigns } = this.props;

    return (
      <div>
        {campaigns.map((campaign, i) => {
          return <div key={i}>{campaign.district}</div>;
        })}
      </div>
    );
  }
}
