import React, { Component } from "react";
import { reduxForm, change } from "redux-form";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { validate } from "./validator";
import { SignUpUI } from "./ui";

class SignUpContainer extends Component {
  componentWillUnmount() {
    if (this.props.errorMessage) {
      this.props.errorMessage.signup = null;
    }
  }

  render() {
    const { handleSubmit, errorMessage, signupUser } = this.props;
    return <SignUpUI handleSubmit={handleSubmit} error={errorMessage} signupUser={signupUser} />;
  }
}

const onSubmitFail = (errors, dispatch) => {
  for (let field in errors) {
    dispatch(change("signup", `${field}`, ""));
  }
};

const mapStateToProps = state => {
  return {
    errorMessage: state.user.error
  };
};

const SignUpForm = reduxForm({ form: "signup", validate, onSubmitFail })(SignUpContainer);
export const SignUp = connect(mapStateToProps, actions)(SignUpForm);
