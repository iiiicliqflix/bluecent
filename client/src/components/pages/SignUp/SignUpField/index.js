import React from "react";

export const SignUpField = ({ input, className, type, placeholder, meta: { touched, error } }) => {
  return (
    <div className={className}>
      <input
        className={`signup__input ${touched && error ? "input--error" : ""}`}
        type={type}
        placeholder={touched && error ? error : placeholder}
        {...input}
      />
    </div>
  );
};
