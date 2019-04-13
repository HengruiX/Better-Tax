import React from 'react';
import Modal from '@material-ui/core/Modal';

import './generic-modal.css';

const FormModal = ({ toggleModal, show, children }) => (
  <Modal className="login-modal" open={show} onBackdropClick={toggleModal}>
    {children}
  </Modal>
);

export default FormModal;
