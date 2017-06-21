import React, { Component } from 'react';

export default class SelectAccount extends Component {
  render() {
    return (
      <div>
        <h2>Select Account</h2>
        <p>{this.props.access_token}</p>
      </div>
    )
  }
}
