import React, { Component } from 'react';
import SelectBank from './SelectBank';
import MainDash from './MainDash';
import SelectAccount from './SelectAccount';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    let user = JSON.parse(localStorage.getItem('user'));
    this.state = {
      user,
      account_id: user.account_id,
      access_token: user.access_token
    }
  }

  setAccessToken(token) {
    console.log(`Token: ${token}`);
    this.setState({ access_token: token });
  }

  setAccountId(id) {
    this.setState({ account_id: id });
  }

  render() {
    if (this.state.account_id) {
      return (
        <MainDash />
      );
    } else if (this.state.access_token) {
      return (
        <SelectAccount user={this.state.user} access_token={this.state.access_token} />
      );
    } else {
      return (
        <SelectBank user={this.state.user} update={this.setAccessToken.bind(this)} />
      );
    }
  }
}
