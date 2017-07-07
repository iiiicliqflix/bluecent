import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <footer className={this.props.class}>
        <p>&copy; 2017 bluecent</p>
      </footer>
    )
  }
}
