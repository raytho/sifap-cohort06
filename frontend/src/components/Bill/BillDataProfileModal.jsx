import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../Modal';


const BillDataProfileModal = (props) => {

   const {
      handleModalProfile,
      dataProfileModal
   } = props;

   return (
      <Modal
         isOpen={dataProfileModal}
         handleModalClose={handleModalProfile}
         isConfirmation
      >
         <p>Debes llenar los datos de tu perfil</p>
         <div>
            <button type='button' onClick={handleModalProfile}>Aceptar</button>
         </div>
      </Modal>
   );
}

BillDataProfileModal.propTypes = {
   handleModalProfile: PropTypes.func.isRequired,
   dataProfileModal: PropTypes.bool.isRequired,
}

export default BillDataProfileModal;