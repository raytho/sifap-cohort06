/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import Modal from '../../Modal';
import '../../../assets/styles/utils/ConfirmateModal.scss'

const UserDeleteModal = (props) => {
   const API = 'https://ancient-fortress-28096.herokuapp.com/api/';

   const {
      handleModalClose,
      modalIsOpen,
      endpoint,
      type
   } = props;
   const [request, setRequest] = useState(false)
   const [deleted, setDeleted] = useState(false);
   const [errorDeleted, setErrorDeleted] = useState(false);
   const handleModalCloseConfirm = () => {
      setDeleted(false);
      setErrorDeleted(false);
      setRequest(false)
   }
   window.console.log(type);
   const deleteUser = () => {
      const getData = async () => {
         try {
            const response = await fetch(`${API}${endpoint}`,{
               method: 'DELETE',
            });
            const result = await response.json();
            if(result.message === 'User deleted') {
               setRequest(true);
               setDeleted(true)
            } else {
               setRequest(true);
               setErrorDeleted(true);
            }
            window.console.log(result.message);
         } catch (error) {
            window.console.log(error.message);
         }
         handleModalClose();
      };
      getData();
   }



   return (
      <>
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
         <Modal
            isOpen={request}
            isConfirmation
         >
            <button type='button' onClick={handleModalCloseConfirm}>X</button>
            {type === 'user' &&
               <>
                  {deleted && <p>Usuario eliminado</p>}
                  {errorDeleted && <p>Hubo un error al eliminar usuario, intentalo de nuevo.</p>}
               </>
            }
            {type === 'invite' &&
               <>
                  {deleted && <p>Invitación eliminada</p>}
                  {errorDeleted && <p>Hubo un error al eliminar invitación, intentalo de nuevo.</p>}
               </>
            }
            <div>
               <button type='button' onClick={handleModalCloseConfirm}>Aceptar</button>
            </div>
         </Modal>
      </>
   )
};

export default UserDeleteModal;