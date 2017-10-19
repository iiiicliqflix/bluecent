import React, { Component } from 'react';
import Header from './common/Header';
import 'react-table/react-table.css'
import '../styles/app.css';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  }
}
