/* eslint-disable react/prop-types */
import React from 'react';

import Modal from '../../Modal';
import '../../../assets/styles/utils/ConfirmateModal.scss'


const RoleDetailModal = (props) => {

   const {
      handleModalClose,
      modalIsOpen
   } = props;
   

   // Send all data of roles except add role
   const sendAllDataRole = () => {
      handleModalClose();
      window.console.log(window.sessionStorage.getItem('authentifyAll'))
   }
   return (
      <Modal
         isOpen={modalIsOpen}
         isConfirmation
      >
         <button type='button' onClick={handleModalClose}>X</button>
         <p>
            ¡Cambios guardados satisfactoriamente!
         </p>
         <div>
            <button type='button' onClick={handleModalClose}>Cancelar</button>
            <button type='button' onClick={sendAllDataRole}>Aceptar</button>
         </div>
      </Modal>
   )
}

export default RoleDetailModal;