import React, { Component } from "react";
import PropTypes from "prop-types";
import { reduxForm, change } from "redux-form";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { validate } from "./validator";
import { SignUpUI } from "./ui";

class SignUpContainer extends Component {
  static propTypes = {
    errorMessage: PropTypes.objectOf(PropTypes.string),
    handleSubmit: PropTypes.func.isRequired,
    signUpUser: PropTypes.func.isRequired
  };

  static defaultProps = {
    errorMessage: {}
  };

  componentWillUnmount() {
    const { errorMessage } = this.props;
    if (errorMessage) {
      errorMessage.signup = null;
    }
  }

  render() {
    const { handleSubmit, errorMessage, signUpUser } = this.props;
    return <SignUpUI handleSubmit={handleSubmit} error={errorMessage} signUpUser={signUpUser} />;
  }
}

const onSubmitFail = (errors, dispatch) => {
  Object.values(errors).map(field => dispatch(change("signup", `${field}`, "")));
};

const mapStateToProps = state => ({
  errorMessage: state.user.error
});

const SignUpForm = reduxForm({ form: "signup", validate, onSubmitFail })(SignUpContainer);
export const SignUp = connect(mapStateToProps, actions)(SignUpForm);
