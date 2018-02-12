import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actions from "../../../actions/auth";
import { HeaderUI } from "./ui";

class HeaderContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.hamburgerClick = this.hamburgerClick.bind(this);
    const darkPages = ["/faq", "/dashboard"];
    if (darkPages.includes(props.location.pathname)) {
      this.state = { theme: "dark" };
    } else {
      this.state = { theme: "light" };
    }
  }

  componentWillReceiveProps() {
    const url = window.location.href;
    const currentRoute = url.substr(url.lastIndexOf("/") + 1);
    if (["faq", "dashboard"].indexOf(currentRoute) < 0) {
      this.setState({ theme: "light", open: false });
    } else {
      this.setState({ theme: "dark", open: false });
    }
  }

  hamburgerClick() {
    const { open } = this.state;
    this.setState({ open: !open });
  }

  render() {
    const { theme, open } = this.state;
    const { signOut, authenticated } = this.props;

    return (
      <HeaderUI
        theme={theme}
        open={open}
        authenticated={authenticated}
        hamburgerClick={this.hamburgerClick}
        signOut={signOut}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.user.authenticated
  };
}

export const Header = connect(mapStateToProps, actions)(withRouter(HeaderContainer));
