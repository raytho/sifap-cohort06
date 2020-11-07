import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../Modal';


const InitialConfigModalConfirm = (props) => {

   const {
      modal,
      handleModal,
      formCF
   } = props;

   let country = '';
   if (formCF.country === 'MEX') {
      country = 'México';
   } else if(formCF.country === 'COL') {
      country = 'Colombia';
   } else if (formCF.country === 'DOM') {
      country = 'República Dominicana';
   }

   return (
      <Modal
         isOpen={modal}
         handleModalClose={handleModal}
         isConfirmation
      >
         <p>
            Configuración de {country} creada
         </p>
         <div>
            <button type='button' onClick={handleModal}>Aceptar</button>
         </div>
      </Modal>
   );
}

InitialConfigModalConfirm.propTypes = {
   modal: PropTypes.bool.isRequired,
   handleModal: PropTypes.func.isRequired,
   formCF: PropTypes.objectOf(
      PropTypes.string,
   ).isRequired
}

export default InitialConfigModalConfirm;