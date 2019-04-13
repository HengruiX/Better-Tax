import React, { Component } from "react";
import UserForm from "./UserForm";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import { Hero, Navbar, Features } from '@front10/landing-page-book/dist/components';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@front10/landing-page-book/dist/themes/default/index.css';

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
        <Hero
            opacity={0.5}
            image='https://images.unsplash.com/photo-1516687401797-25297ff1462c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'
            header="taxplorer"
            subHeader="easy tax for immigrants"
            particles={false}
            minHeight="100vh"
            headerTextColor="#4b0082"
            subHeaderTextColor="#4b0000"
            callToActionColor="#7b0000"
            callToActionMargin="2"
            callToAction="Call to action"
        />
        <LandingBanner />
        
        <InfoContainer />
        <Button type="button" color="primary" onClick={this.toggleModal}>
          Get Started!
        </Button>
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
