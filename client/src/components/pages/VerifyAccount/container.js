import React, { Component } from "react";
import { connect } from "react-redux";
import { browserHistory } from "react-router";
import * as actions from "../../../actions";
import { VerifyAccountUI } from "./ui";

class VerifyAccountContainer extends Component {
  componentWillMount() {
    const { signup, location } = this.props;

    if (!signup || !location.query.email) {
      browserHistory.push("/signup");
    }
  }

  render() {
    const { location } = this.props;
    return <VerifyAccountUI email={location.query.email} />;
  }
}

function mapStateToProps(state) {
  return {
    signup: state.user.signup
  };
}

export const VerifyAccount = connect(mapStateToProps, actions)(VerifyAccountContainer);
