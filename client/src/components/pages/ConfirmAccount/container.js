import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "../../../actions";

export class ConfirmAccountContainer extends Component {
  static propTypes = {
    location: PropTypes.objectOf(PropTypes.string).isRequired,
    verifyAccount: PropTypes.func.isRequired,
    errorMessage: PropTypes.objectOf(PropTypes.string)
  };

  static defaultProps = {
    errorMessage: {}
  };

  componentWillMount() {
    const { location, verifyAccount } = this.props;
    const { email, token } = location.query;
    verifyAccount({ email, token });
  }

  render() {
    const { errorMessage } = this.props;
    return errorMessage.verifyAccount ? <div>{errorMessage.verifyAccount}</div> : <div />;
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.user.error
  };
}

export const ConfirmAccount = connect(mapStateToProps, actions)(ConfirmAccountContainer);
