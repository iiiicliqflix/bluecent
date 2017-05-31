import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectBank from './SelectBank';

export default class Dashboard extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="hdr">Dashboard</h1>
        <SelectBank />
      </div>
    );
  }
}
