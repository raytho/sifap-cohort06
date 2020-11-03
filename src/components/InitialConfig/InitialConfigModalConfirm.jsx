import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../Modal';

const InitialConfigModalConfirm = (props) => {

   const {
      modal,
      handleModal
   } = props;

   return (
      <Modal
         isOpen={modal}
         handleModalClose={handleModal}
      >
         <div>
            <h2>
               configuración de ..... creada
            </h2>
            <button type='button' onClick={handleModal}>Aceptar</button>
         </div>
      </Modal>
   );
}

InitialConfigModalConfirm.propTypes = {
   modal: PropTypes.bool.isRequired,
   handleModal: PropTypes.func.isRequired,
}

export default InitialConfigModalConfirm;