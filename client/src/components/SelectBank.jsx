import React, { Component } from 'react';

export default class SelectBank extends Component {
  componentWillMount() {
    let handler = window.Plaid.create({
      clientName: 'BlueCent',
      env: 'sandbox',
      key: '80aa88b8cce388ffc75efe840a5709',
      product: ['auth', 'transactions'],
      onSuccess: function(public_token, metadata) {
        fetch('http://localhost:8000/get_access_token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ public_token: public_token })
        });
      }
    });
    this.setState({handler: handler});
  }

  render() {
    return (
      <button className="btn" onClick={() => {this.state.handler.open()}}>
        Get Started
      </button>
    );
  }
}
