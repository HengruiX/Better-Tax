import React, { Component } from "react";
import UserForm from "./UserForm";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";

import image from "../../screenshot.png";
import "./styles.css";

class LandingPage extends Component {
  state = { show: true };

  toggleModal = () => {
    this.setState({ show: !this.state.show });
  };

  render() {
    return (
      <div className="App">
        <div className="background-img">
        </div>
        <LoginModal show={this.state.show} toggleModal={this.toggleModal}>
          <UserForm />
        </LoginModal>
      </div>
    );
  }
}

const LoginModal = ({ toggleModal, show, children }) => (
  <Modal className="login-modal" open={show} onBackdropClick={toggleModal}>
    {children}
  </Modal>
);

const LandingBanner = () => (
  <div className="landing-banner">Landing Banner Content</div>
);

const InfoContainer = () => (
  <div className="info-container">convincing text!!</div>
);

export default LandingPage;
