import React from "react";
import PropTypes from "prop-types";
import "./style.css";

export const PaymentsInputUI = ({ input: { name }, placeholder, maxLength, meta: { error, touched } }) => (
  <span>
    <input
      className={`input ${name} ${touched && error ? "has-error" : ""}`}
      placeholder={touched && error ? error : placeholder}
      maxLength={maxLength}
    />
  </span>
);

PaymentsInputUI.propTypes = {
  input: PropTypes.object.isRequired,
  placeholder: PropTypes.string.isRequired,
  maxLength: PropTypes.string,
  meta: PropTypes.object.isRequired
};

PaymentsInputUI.defaultProps = {
  maxLength: "50"
};
