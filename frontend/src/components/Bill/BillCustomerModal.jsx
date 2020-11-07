/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../Modal';
import '../../assets/styles/components/Bill/BillCustomerModal.scss';

const BillCustomerModal = (props) => {

   const {
      modal,
      handleModal,
      customers,
      loaderCustomer,
      handleInputCustomer,
      getDataCustomerId
   } = props;

   return (
      <Modal
         isOpen={modal}
         handleModalClose={handleModal}
      >
         <div className='BillCustomerModal'>
            <h2>Clientes</h2>
            <label htmlFor='customer'>
               <select name='customer' size='3' onChange={handleInputCustomer}>
                  {loaderCustomer && <option>Cargando...</option>}
                  {
                     customers?.clients.map(item =>
                        <option value={item.clientId} key={item.clientId}>{item.fullName}</option>
                     )
                  }
               </select>
            </label>
            <div className='BillCustomerModal__buttons'>
               <button  type='button' onClick={handleModal}>Cancelar</button>
               <button  type='button' onClick={getDataCustomerId}>Aceptar</button>
            </div>
         </div>
      </Modal>
   );
}

BillCustomerModal.propTypes = {
   modal: PropTypes.bool.isRequired,
   loaderCustomer: PropTypes.bool.isRequired,
   handleModal: PropTypes.func.isRequired,
   handleInputCustomer: PropTypes.func.isRequired,
   getDataCustomerId: PropTypes.func.isRequired,
   customers: PropTypes.objectOf(
      PropTypes.any
   )
}

export default BillCustomerModal;