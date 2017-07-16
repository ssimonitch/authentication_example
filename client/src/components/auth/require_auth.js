import React, { Component } from 'react';
import { connect } from 'react-redux';

/*
  HOC to wrap routes that we want to require authentication
*/

export default function(ComposedComponent) {
  class Authentication extends Component {

    // define context to get access to react router props
    static contextTypes = {
      router: React.PropTypes.object
    }

    // handle case of access resource while signed out
    componentWillMount() {
      if(!this.props.authenticated) {
        this.context.router.push('/');
      }
    }

    // handle case of access resource while changing from signed in to signed out
    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.context.router.push('/');
      }
    }

    render() {
      // HOC that wraps any component to provide authentication
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
}
