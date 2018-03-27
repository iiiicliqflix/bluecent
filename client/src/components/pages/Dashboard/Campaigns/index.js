import React, { Component } from "react";
import CampaignList from "./CampaignList";

export default class Campaigns extends Component {
  constructor(props) {
    super(props);
    const campaigns = this.groupCampaignsByType(props.campaigns);
    this.state = {
      campaigns,
      campaignList: "House",
      points: props.user.points
    };
  }

  static groupCampaignsByType(campaigns) {
    return campaigns.reduce((memo, x) => {
      const arr = memo;
      if (!arr[x.level]) {
        arr[x.level] = [];
      }
      arr[x.level].push(x);
      return arr;
    }, []);
  }

  render() {
    const { user } = this.props;
    const { campaigns } = this.state;

    if (!campaigns) {
      return <div>Loading</div>;
    }

    return (
      <div className="campaigns">
        <div className="table-hdr">
          <h2 className="table-title">{user.points} points remaining.</h2>
          <div className="table-toggle">
            <button className="toggle-btn">House</button>
            <button className="toggle-btn">Senate</button>
            <button className="toggle-btn">Governor</button>
          </div>
        </div>
        <CampaignList campaigns={campaigns[this.state.campaignList]} />
      </div>
    );
  }
}
