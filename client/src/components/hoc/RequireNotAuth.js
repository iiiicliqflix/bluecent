import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { browserHistory } from "react-router";

export function RequireNotAuth(ComposedComponent) {
  class NotAuthentication extends Component {
    static propTypes = {
      authenticated: PropTypes.bool
    };

    static defaultProps = {
      authenticated: false
    };

    constructor(props) {
      super(props);
      if (props.authenticated) {
        browserHistory.push("/dashboard");
      }
    }

    componentWillUpdate(nextProps) {
      if (nextProps.authenticated) {
        browserHistory.push("/dashboard");
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

  return connect(mapStateToProps)(NotAuthentication);
}
