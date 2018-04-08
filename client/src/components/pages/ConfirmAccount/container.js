import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "../../../actions";

export class ConfirmAccountContainer extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    verifyAccount: PropTypes.func.isRequired,
    errorMessage: PropTypes.object
  };

  static defaultProps = {
    errorMessage: {}
  };

  componentWillMount() {
    const { location, verifyAccount } = this.props;
    const { email, token } = location.query;
    console.log("confirm account");
    verifyAccount({ email, token });
  }

  render() {
    const { errorMessage } = this.props;
    return errorMessage.verifyAccount ? <div>{errorMessage.verifyAccount}</div> : <div />;
  }
}

function mapStateToProps(state) {
  console.log("map state to props");
  return {
    errorMessage: state.user.error
  };
}

export const ConfirmAccount = connect(mapStateToProps, actions)(ConfirmAccountContainer);
