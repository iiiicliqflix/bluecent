import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { browserHistory } from "react-router";

export function RequireAuth(ComposedComponent) {
  class Authentication extends Component {
    static propTypes = {
      authenticated: PropTypes.bool.isRequired
    };

    componentWillMount() {
      if (!this.props.authenticated) {
        browserHistory.push("/");
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        browserHistory.push("/");
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
      authenticated: state.user.authenticated
    };
  }

  return connect(mapStateToProps)(Authentication);
}
