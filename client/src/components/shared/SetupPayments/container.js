import React, { Component } from "react";
import PropTypes from "prop-types";
import { reduxForm, change } from "redux-form";
import { injectStripe } from "react-stripe-elements";
import { validate } from "./validator";
import { SetupPaymentsUI } from "./ui";

class SetupPaymentsContainer extends Component {
  static propTypes = {
    stripe: PropTypes.object.isRequired,
    submitToken: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    const frames = Array.from(document.getElementsByTagName("iframe"));
    const stripeEls = Array.from(document.getElementsByClassName("__PrivateStripeElement"));
    Array.from(frames).forEach(el => {
      el.style = null;
    });
    Array.from(stripeEls).forEach(el => {
      el.style = null;
    });
  }

  submit(values) {
    const { cardholder, zipcode } = values;
    const { stripe, submitToken } = this.props;

    stripe
      .createToken({ name: cardholder, address_zip: zipcode })
      .then(({ token }) => submitToken(token))
      .catch(error => console.log(error));
  }

  render() {
    const { handleSubmit } = this.props;
    return <SetupPaymentsUI handleSubmit={handleSubmit} submit={this.submit} />;
  }
}

const onSubmitFail = (errors, dispatch) => {
  Object.values(errors).map(field => dispatch(change("setuppayments", `${field}`, "")));
};

export const SetupPayments = injectStripe(
  reduxForm({ form: "setuppayments", validate, onSubmitFail })(SetupPaymentsContainer)
);
