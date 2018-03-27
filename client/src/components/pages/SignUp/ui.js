import React from "react";
import PropTypes from "prop-types";
import { Field } from "redux-form";
import { SignUpField } from "./SignUpField";
import "./style.css";

export const SignUpUI = ({ handleSubmit, error, signUpUser }) => (
  <div className="signup">
    <h2>Sign Up</h2>
    <form className="signup__form" onSubmit={handleSubmit(signUpUser)}>
      <Field
        name="first"
        component={SignUpField}
        className="signup__field signup__field--first"
        type="text"
        placeholder="First"
      />
      <Field
        name="last"
        component={SignUpField}
        className="signup__field signup__field--last"
        type="text"
        placeholder="Last"
      />
      <Field name="email" component={SignUpField} className="signup__field" type="text" placeholder="Email" />
      <Field name="password" component={SignUpField} className="signup__field" type="password" placeholder="Password" />
      <Field
        name="confirmpassword"
        component={SignUpField}
        className="signup__field"
        type="password"
        placeholder="Confirm Password"
      />
      {error.signup && (
        <div className="signup__error">
          <div className="signup__error--message">{error.signup}</div>
        </div>
      )}
      <button type="submit" className="signup__button">
        Sign Up
      </button>
    </form>
  </div>
);

SignUpUI.propTypes = {
  error: PropTypes.objectOf(PropTypes.string).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  signUpUser: PropTypes.func.isRequired
};
