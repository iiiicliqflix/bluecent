import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { browserHistory } from "react-router";
import * as actions from "../../../actions";
import { SetupAccountUI } from "./ui";
import "./style.css";

class SetupAccountContainer extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired, // eslint-disable-line
    getAccessToken: PropTypes.func.isRequired,
    setupPayments: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.submitStripeToken = this.submitStripeToken.bind(this);
  }

  componentWillMount() {
    const { user } = this.props;
    if (user.hasAccessToken && user.hasCustomerId) {
      browserHistory.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    const { user } = nextProps;
    if (user.hasAccessToken && user.hasCustomerId) {
      browserHistory.push("/dashboard");
    }
  }

  getAccessToken() {
    this.props.getAccessToken(this.props.user);
  }

  submitStripeToken(token) {
    this.props.setupPayments(token, this.props.user);
  }

  render() {
    const { user } = this.props;
    return (
      <SetupAccountUI user={user} getAccessToken={this.getAccessToken} submitStripeToken={this.submitStripeToken} />
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.user
  };
}

export const SetupAccount = connect(mapStateToProps, actions)(SetupAccountContainer);
