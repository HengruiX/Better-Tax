import React, { Component } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

class UserForm extends Component {
  state = { isSignIn: true };

  switchView = isSignIn => {
    this.setState({ isSignIn });
  };

  render() {
    return this.state.isSignIn ? (
      <SignInForm switchView={this.switchView} />
    ) : (
      <SignUpForm switchView={this.switchView} />
    );
  }
}

export default UserForm;
