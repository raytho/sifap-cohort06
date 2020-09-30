/* eslint-disable react/prop-types */
import React from 'react';

import Modal from '../../Modal';
import '../../../assets/styles/utils/ConfirmateModal.scss'


const RoleDetailModal = (props) => {

   const {
      handleModalClose,
      modalIsOpen
   } = props;
   return (
      <Modal
         isOpen={modalIsOpen}
         isConfirmation
      >
         <button type='button' onClick={handleModalClose}>X</button>
         <p>
            ¡Cambios realizados satisfactoriamente!
         </p>
         <div>
            <button type='button' onClick={handleModalClose}>Cancelar</button>
            <button type='button' onClick={handleModalClose}>Aceptar</button>
         </div>
      </Modal>
   )
}

export default RoleDetailModal;