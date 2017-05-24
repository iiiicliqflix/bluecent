import React, { Component } from 'react';
import SelectAccount from '../SelectAccount';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="hdr">Every cent counts.</h1>
        <div className="btns">
          <SelectAccount/>
          <button className="btn">FAQ</button>
        </div>
      </div>
    );
  }
}
