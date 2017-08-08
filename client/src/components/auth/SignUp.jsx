import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const renderField = ({ input, className, type, placeholder }) => (
  <div className={className}>
    <input className="input signup-input" type={type} placeholder={placeholder} {...input} />
  </div>
);

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(props) {
    this.props.signupUser(props);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="signup-container">
        <h1 className="hdr">Sign Up</h1>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <Field name="first" component={renderField} className="form-field field-first" type="text" placeholder="First" />
          <Field name="last" component={renderField} className="form-field field-last" type="text" placeholder="Last" />
          <Field name="email" component={renderField} className="form-field" type="text" placeholder="Email" />
          <Field name="password" component={renderField} className="form-field" type="password" placeholder="Password" />
          <Field name="confirmpassword" component={renderField} className="form-field" type="password" placeholder="Confirm Password" />
          <button type="submit" className="btn auth">Sign Up</button>
        </form>
      </div>
    )
  }
}

const validate = props => {
  const errors = {};
  const fields = ['firstname', 'lastname', 'email', 'password', 'confirmpassword'];

  fields.forEach((f) => {
    if(!(f in props)) {
      errors[f] = `${f} is required`;
    }
  });

  if(props.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(props.email)) {
    errors.email = "please provide valid email";
  }

  if(props.password && props.password.length < 6) {
    errors.password = "minimum 6 characters";
  }

  if(props.password !== props.confirmpassword) {
    errors.confirmpassword = "Passwords don't match";
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

SignUp = reduxForm({ form: 'signup', validate })(SignUp);

export default connect(mapStateToProps, actions)(SignUp);
