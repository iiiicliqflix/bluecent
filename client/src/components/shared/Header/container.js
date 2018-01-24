import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actions from "../../../actions/auth";
import { HeaderUI } from "./ui";

class HeaderContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
    const darkPages = ["/faq", "/dashboard", "/faq/"];
    if (darkPages.includes(props.location.pathname)) {
      this.state = { color: "dark" };
    } else {
      this.state = { color: "light" };
    }
  }

  componentWillReceiveProps() {
    const url = window.location.href;
    const currentRoute = url.substr(url.lastIndexOf("/") + 1);
    if (["faq", "dashboard"].indexOf(currentRoute) < 0) {
      this.setState({ color: "light" });
    } else {
      this.setState({ color: "dark" });
    }
  }

  signOut() {
    this.props.signOut();
  }

  render() {
    const { color } = this.state;
    const { authenticated } = this.props;

    return <HeaderUI color={color} authenticated={authenticated} signOut={this.signOut} />;
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.user.authenticated
  };
}

export const Header = connect(mapStateToProps, actions)(withRouter(HeaderContainer));
