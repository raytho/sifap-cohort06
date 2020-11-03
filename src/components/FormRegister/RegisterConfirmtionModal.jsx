/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';

import '../../assets/styles/components/Register/RegisterConfirmtionModal.scss';

const RegisterConfirmtionModal = ({ modalConfirm, handleModalClose }) => {

   return (
      <Modal
         isOpen={modalConfirm}
         handleModalClose={handleModalClose}
      >
         <div className='RegisterConfirmtionModal__container'>
            <h2>¡Cuenta creada!</h2>
            <button type='button' onClick={handleModalClose}>Aceptar</button>
         </div>
      </Modal>
   );
}

RegisterConfirmtionModal.propTypes = {
   modalConfirm: PropTypes.bool.isRequired,
   handleModalClose: PropTypes.func.isRequired
}

export default RegisterConfirmtionModal;