import React from "react";
import "./style.css";

export const VerifyAccountUI = ({ email }) => (
  <div className="verify">
    <h2>Activate your account.</h2>
    <p className="verify__text">
      You'll be all set once your confirm the verification email we sent to you at <u>{email && email}</u>.
    </p>
  </div>
);
