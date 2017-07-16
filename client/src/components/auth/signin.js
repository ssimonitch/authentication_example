import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../../actions';

class SignIn extends Component {
  handleFormSubmit({ email, password }) {
    this.props.signinUser({ email, password });
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
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <Field
            name="email"
            component="input"
            type="email"
            className="form-control"
          />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <Field
            name="password"
            component="input"
            type="password"
            className="form-control"
          />
        </fieldset>
        { this.renderAlert() }
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    );
  }
}

SignIn.propTypes = {
  handleSubmit: PropTypes.func,
  signinUser: PropTypes.func,
  errorMessage: PropTypes.string
};

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

// http://redux-form.com/6.8.0/
const form = reduxForm({ form: 'signin' })(SignIn);
export default connect(mapStateToProps, actions)(form);
