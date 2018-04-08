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
      console.log("Require not auth");
      if (props.authenticated) {
        console.log("Require not auth - authenticated");
        browserHistory.push("/dashboard");
      }
    }

    componentWillUpdate(nextProps) {
      if (nextProps.authenticated) {
        browserHistory.push("/dashboard");
      }
    }

    render() {
      console.log(this.props);
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
