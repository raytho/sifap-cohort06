/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';

const ConfirmSendModal = ({ modal, handleModalClose }) => {

   return (
      <Modal
      isOpen={modal}
      handleModalClose={handleModalClose}
      >
         <div>
            <h2>Se ha enviado un enlace a tu correo, para reetablecer la contraseña</h2>
            <button type='button' onClick={handleModalClose}>Aceptar</button>
         </div>
      </Modal>
   );
}

ConfirmSendModal.propTypes = {
   modal: PropTypes.bool,
   handleModalClose: PropTypes.func,
}

export default ConfirmSendModal;