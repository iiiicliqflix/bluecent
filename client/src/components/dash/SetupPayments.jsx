import React, { Component } from 'react';
import { CardNumberElement, CardExpiryElement, CardCVCElement, injectStripe } from 'react-stripe-elements';
import * as actions from '../../actions/auth';

class SetupPayments extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let form = document.querySelector('form');
    let extraDetails = {
      name: form.querySelector('input[name=cardholder]').value,
      address_zip: form.querySelector('input[name=zipcode]').value
    }
    this.props.stripe.createToken(extraDetails).then(({token}) => {
      console.log('Received Stripe token:', token);
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="payment-form">
        <div>
          <span className="payment-field">
            <input className="input input-cardholder" name="cardholder" placeholder="Carholder's Name" />
          </span>
          <span className="payment-field">
            <input className="input input-zipcode" name="zipcode" maxLength="5" placeholder="Zipcode" />
          </span>
        </div>
        <div>
          <CardNumberElement classes={{base: 'card-number'}} />
          <CardExpiryElement classes={{base: 'card-expiry'}} />
          <CardCVCElement classes={{base: 'card-cvc'}} />
        </div>
        <button type="submit" className="btn btn-payment">Submit</button>
      </form>
    );
  }
}

export default injectStripe(SetupPayments);
