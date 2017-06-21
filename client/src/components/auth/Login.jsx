import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth';

const renderField = ({ input, type, placeholder }) => (
  <div className="form-field">
    <input className="input login-input" type={type} placeholder={placeholder} {...input} />
  </div>
);

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(props) {
    this.props.loginUser(props);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="container">
        <h1 className="hdr">Login</h1>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <Field name="email" component={renderField} type="text" placeholder="Email" />
          <Field name="password" component={renderField} type="password" placeholder="Password" />
          <button type="submit" className="btn auth">Login</button>
        </form>
      </div>
    )
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Email is required.';
  }

  if (!formProps.password) {
    errors.password = 'Password is required.';
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

Login = reduxForm({ form: 'login', validate })(Login);

export default connect(mapStateToProps, actions)(Login);
