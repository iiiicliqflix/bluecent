import React, { PureComponent } from "react";
import { Field } from "redux-form";
import { LoginField } from "./LoginField";
import "./style.css";

export class LoginUI extends PureComponent {
  render() {
    const { handleSubmit, error, loginUser } = this.props;

    return (
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
  }
}
