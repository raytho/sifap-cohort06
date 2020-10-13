/* eslint-disable react/prop-types */
import React from 'react';

import Modal from '../../Modal';
import '../../../assets/styles/utils/ConfirmateModal.scss'

const UserDeleteModal = (props) => {
   const API = 'https://ancient-fortress-28096.herokuapp.com/api/';

   const {
      handleModalClose,
      modalIsOpen,
      endpoint,
   } = props;


   const deleteUser = () => {
      const getData = async () => {
         try {
            const response = await fetch(`${API}${endpoint}`,{
               method: 'DELETE',
            });
            const result = await response.json();
               window.console.log(result);
         } catch (error) {
            window.console.log(error.message);
         }
         handleModalClose();
      };
      getData();
   }



   return (
      <Modal
         isOpen={modalIsOpen}
         isConfirmation
      >
         <button type='button' onClick={handleModalClose}>X</button>
         <p>
            ¿Estás seguro que deseas eliminar este usuario?
         </p>
         <div>
            <button type='button' onClick={handleModalClose}>Cancelar</button>
            <button type='button' onClick={deleteUser}>Aceptar</button>
         </div>
      </Modal>
   )
};

export default UserDeleteModal;