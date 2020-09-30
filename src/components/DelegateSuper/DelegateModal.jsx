/* eslint-disable react/prop-types */
import React from 'react';

import Modal from '../Modal';
// import '../../assets/styles/utils/ConfirmateModal.scss';

const DelegateModal = (props) => {

   const  {
      isOpen,
      handleModalClose,
      // confirmSendForm
   } = props;

   return (
      <Modal
         isOpen={isOpen}
         isConfirmation
      >
         <button type='button' onClick={handleModalClose}>X</button>
         <p>
            ¿Estás seguro que deseas delegar el rol de super administrador y pasar a rol administrador?
         </p>
         <div>
            <button type='button' onClick={handleModalClose}>Cancelar</button>
            <button type='button' onClick={handleModalClose}>Aceptar</button>
         </div>
      </Modal>
   );
}

export default DelegateModal;