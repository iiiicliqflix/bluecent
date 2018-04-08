import React from "react";
import PropTypes from "prop-types";
import { Field } from "redux-form";
import { LoginField } from "./LoginField";
import "./style.css";

export const LoginUI = ({ handleSubmit, loginUser, error }) => (
  <div className="login">
    <h2>Login</h2>
    <form className="login__form" onSubmit={handleSubmit(loginUser)}>
      <Field name="email" component={LoginField} type="text" placeholder="Email" />
      <Field name="password" component={LoginField} type="password" placeholder="Password" />
      {error && error.login && <div className="login__error-container">{error.login}</div>}
      <button className="login__button" type="submit">
        Login
      </button>
    </form>
  </div>
);

LoginUI.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired
};
