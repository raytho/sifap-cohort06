import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../Modal';

const BillSendModal = (props) => {

   const {
      sendBillModal,
      handleModalBill,
      billPDF,
   } = props;

   return (
      <Modal
         isOpen={sendBillModal}
         handleModalClose={handleModalBill}
         isConfirmation
      >
         <p>Se generó la factura correctamente</p>
         <div>
            <button type='button' onClick={handleModalBill}>
               <a href={billPDF} target='_blank' rel='noreferrer'>Ver factura</a>
            </button>
         </div>
      </Modal>
   );
}

BillSendModal.propTypes = {
   sendBillModal: PropTypes.bool.isRequired,
   handleModalBill: PropTypes.func.isRequired,
   billPDF: PropTypes.string.isRequired

}

export default BillSendModal;