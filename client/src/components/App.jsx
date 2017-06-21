import React, { Component } from 'react';
import Header from './common/Header';
import Footer from './common/Footer';
import '../styles/app.css';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}
