import React, { Component } from "react";
import { reduxForm, change } from "redux-form";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { validate } from "./validator";
import { LoginUI } from "./ui";

class LoginContainer extends Component {
  componentWillUnmount() {
    if (this.props.errorMessage) {
      this.props.errorMessage.login = null;
    }
  }

  render() {
    const { handleSubmit, errorMessage, loginUser } = this.props;
    return <LoginUI handleSubmit={handleSubmit} error={errorMessage} loginUser={loginUser} />;
  }
}

const onSubmitFail = (errors, dispatch) => {
  for (let field in errors) {
    dispatch(change("login", `${field}`, ""));
  }
};

const mapStateToProps = state => {
  return {
    errorMessage: state.user.error
  };
};

const LoginForm = reduxForm({ form: "login", validate, onSubmitFail })(LoginContainer);
export const Login = connect(mapStateToProps, actions)(LoginForm);
