import React, { Component } from 'react';

export default class SelectBank extends Component {
  constructor(props) {
    super(props);
    let handler = window.Plaid.create({
      clientName: 'BlueCent',
      env: 'development',
      key: '80aa88b8cce388ffc75efe840a5709',
      product: ['auth', 'transactions'],
      onSuccess: function(public_token, metadata) {
        fetch('http://localhost:8000/get_access_token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ public_token: public_token, user: props.user })
        }).then((resp) => {
          return resp.json();
        }).then((data) => {
          console.log(`Data: ${data.access_token}`);
          props.update(data.access_token);
        }).catch((err) => {
          console.log('ERROR');
        })
      }
    });
    this.state = {handler: handler};
  }

  render() {
    return (
      <div className="bank-container">
        <h2 className="bank-hdr">Hey, {this.props.user.first}! Connect your bank account to get started donating to progressive candidates.</h2>
        <button className="btn" onClick={() => {this.state.handler.open()}}>
          Connect Account
        </button>
      </div>
    );
  }
}
