import React from "react";

export const LoginField = ({ input, type, placeholder, meta: { touched, error } }) => (
  <div className="login__field">
    <input
      className={`login__input ${touched && error ? "input--error" : ""}`}
      type={type}
      placeholder={touched && error ? error : placeholder}
      {...input}
    />
  </div>
);
