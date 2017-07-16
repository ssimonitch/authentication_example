import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import * as actions from '../../actions';

// redux-form validation
// http://redux-form.com/6.6.3/examples/syncValidation/
function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match!';
  }

  return errors;
}

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <input {...input} className="form-control" type={type} />
    { touched && error && <div className="error">{error}</div>}
  </div>
);

class SignUp extends Component {
  handleFormSubmit(formProps) {
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Ooops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit} = this.props;

    return (
      <form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) }>
        <fieldset className="form-group">
          <Field
            name="email"
            label="Email:"
            component="input"
            type="email"
            component={renderField}
          />
        </fieldset>
        <fieldset className="form-group">
          <Field
            name="password"
            label="Password:"
            component="input"
            type="password"
            component={renderField}
          />
        </fieldset>
        <fieldset className="form-group">
          <Field
            name="passwordConfirm"
            label="Confirm Password:"
            component="input"
            type="password"
            component={renderField}
          />
        </fieldset>
        { this.renderAlert() }
        <button action="submit" className="btn btn-primary">Sign up!</button>
      </form>
    );
  }
}

SignUp.propTypes = {
  handleSubmit: PropTypes.func,
  signupUser: PropTypes.func,
  errorMessage: PropTypes.string,
};

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

renderField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
};

const form = reduxForm({
  form: 'signup',
  validate
})(SignUp);

export default connect(mapStateToProps, actions)(form);
