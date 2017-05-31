import React, { Component } from 'react';
import SelectBank from './SelectBank';

export default class Dashboard extends Component {
  componentWillMount() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  render() {
    return (
      <div className="dashboard-container">
        <h2 className="dashboard-hdr">Hey, {this.user.first}! Connect your bank account to get started donating spare change.</h2>
        <SelectBank />
      </div>
    );
  }
}
