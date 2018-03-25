import React, { Component } from "react";
import { reduxForm, Field, change } from "redux-form";
import { CardNumberElement, CardExpiryElement, CardCVCElement, injectStripe } from "react-stripe-elements";

const renderField = ({ input, className, placeholder, maxLength, meta: { touched, error } }) => (
  <span>
    <input
      className={`input input-${className} ${touched && error ? "has-error" : ""}`}
      placeholder={touched && error ? error : placeholder}
      maxLength={maxLength ? maxLength : 50}
      {...input}
    />
  </span>
);

class SetupPayments extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(event) {
    event.preventDefault();
    const form = document.querySelector("form");
    const extraDetails = {
      name: form.querySelector("input[name=cardholder]").value,
      address_zip: form.querySelector("input[name=zipcode]").value
    };
    this.props.stripe
      .createToken(extraDetails)
      .then(({ token }) => {
        this.props.submitToken(token);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="payment-form">
        <div className="payment-details">
          <Field component={renderField} className="cardholder" name="cardholder" placeholder="Carholder's Name" />
          <Field component={renderField} className="zipcode" name="zipcode" maxLength="5" placeholder="Zipcode" />
        </div>
        <div>
          <CardNumberElement classes={{ base: "card-number" }} />
          <CardExpiryElement classes={{ base: "card-expiry" }} />
          <CardCVCElement classes={{ base: "card-cvc" }} />
        </div>
        <button type="submit" className="btn btn-payment">
          Submit
        </button>
      </form>
    );
  }
}

const validate = props => {
  const errors = {};

  if (!props.cardholder) {
    errors.cardholder = "Cardholder's name is required.";
  }

  if (!props.zipcode) {
    errors.zipcode = "Required.";
  }

  if (props.zipcode && !/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(props.zipcode)) {
    errors.zipcode = "Invalid.";
  }

  return errors;
};

const onSubmitFail = (errors, dispatch) => {
  for (let field in errors) {
    dispatch(change("setuppayments", `${field}`, ""));
  }
};

SetupPayments = reduxForm({ form: "setuppayments", validate, onSubmitFail })(SetupPayments);
export default injectStripe(SetupPayments);
