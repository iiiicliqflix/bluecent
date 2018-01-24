import React, { PureComponent } from "react";
import { Field } from "redux-form";
import { SignUpField } from "./SignUpField";
import "./style.css";

export class SignUpUI extends PureComponent {
  render() {
    const { handleSubmit, errorMessage, signupUser } = this.props;

    return (
      <div className="signup">
        <h2>Sign Up</h2>
        <form className="signup__form" onSubmit={handleSubmit(signupUser)}>
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
          <Field
            name="email"
            component={SignUpField}
            className="signup__field"
            type="text"
            placeholder="Email"
          />
          <Field
            name="password"
            component={SignUpField}
            className="signup__field"
            type="password"
            placeholder="Password"
          />
          <Field
            name="confirmpassword"
            component={SignUpField}
            className="signup__field"
            type="password"
            placeholder="Confirm Password"
          />
          {errorMessage &&
            errorMessage.signup && <div className="error-container">{errorMessage.signup}</div>}
          <button type="submit" className="signup__button">
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}
