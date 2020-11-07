/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';

import '../../assets/styles/components/ResetPassword/ConfirmSendModal.scss';

const ConfirmSendModal = ({ modal, handleModalClose }) => {

   return (
      <Modal
      isOpen={modal}
      handleModalClose={handleModalClose}
      >
         <div className='ConfirmSendModal'>
            <h2>Se envío un enlace a tu correo</h2>
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