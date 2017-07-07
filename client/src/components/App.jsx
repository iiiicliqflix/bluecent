import React, { Component } from 'react';
import Header from './common/Header';
import Footer from './common/Footer';
import 'react-table/react-table.css'
import '../styles/app.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    if (this.props.location.pathname === '/dashboard') {
      this.state = {
        contentClass: 'content-white',
        footerClass: 'footer-white'
      }
    } else {
      this.state = {
        contentClass: '',
        footerClass: ''
      }
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className={"content " + this.state.contentClass}>
          {this.props.children}
        </div>
        <Footer class={this.state.footerClass} />
      </div>
    );
  }
}
