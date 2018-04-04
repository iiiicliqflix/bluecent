import React from "react";
import PropTypes from "prop-types";
import "./style.css";

export const PaymentsInputUI = ({ input, placeholder, maxLength, meta: { error, touched } }) => {
  return (
    <span>
      <input
        className={`input ${input.name} ${touched && error ? "input--error" : ""}`}
        placeholder={touched && error ? error : placeholder}
        maxLength={maxLength}
        {...input}
      />
    </span>
  );
};

PaymentsInputUI.propTypes = {
  input: PropTypes.object.isRequired,
  placeholder: PropTypes.string.isRequired,
  maxLength: PropTypes.string,
  meta: PropTypes.object.isRequired
};

PaymentsInputUI.defaultProps = {
  maxLength: "50"
};
