import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/auth';
import SelectBank from './SelectBank';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.signOut();
  }

  render() {
    return (
      <div className="container">
        <h1 className="hdr">Dashboard</h1>
        <SelectBank />
        <button className="btn" onClick={this.handleClick}>Sign Out</button>
      </div>
    );
  }
}

export default connect(null, actions)(Dashboard);
