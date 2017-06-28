import React, { Component } from 'react';
import DashHeader from './DashHeader';
import TransactionTable from './TransactionTable';
import SelectBank from './SelectBank';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    let user = JSON.parse(localStorage.getItem('user'));
    this.state = {
      user,
      access_token: user.access_token
    }
  }

  setAccessToken(token) {
    this.setState({ access_token: token });
  }

  render() {
    if (this.state.access_token) {
      return (
        <div className="dash-container">
          <DashHeader user={this.state.user} />
          <TransactionTable access_token={this.state.access_token} />
        </div>
      );
    } else {
      return (
        <SelectBank user={this.state.user} update={this.setAccessToken.bind(this)} />
      );
    }
  }
}
