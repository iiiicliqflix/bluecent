import React, { Component } from "react";
import { connect } from "react-redux";
import { browserHistory } from "react-router";
import * as actions from "../../../actions";
import { VerifyAccountUI } from "./ui";

class VerifyAccountContainer extends Component {
  componentWillMount() {
    const { signup } = this.props;
    const { location } = this.props;
    this.email = location.query.email;

    if (!signup || !this.email) {
      browserHistory.push("/signup");
    }
  }

  render() {
    return <VerifyAccountUI email={this.email} />;
  }
}

function mapStateToProps(state) {
  return {
    signup: state.user.signup
  };
}

export const VerifyAccount = connect(mapStateToProps, actions)(VerifyAccountContainer);
