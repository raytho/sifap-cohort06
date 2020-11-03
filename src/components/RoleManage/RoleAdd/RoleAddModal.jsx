/* eslint-disable react/prop-types */
import React from 'react';

import Modal from '../../Modal';
import '../../../assets/styles/utils/Alerts.scss';


const RoleAddModal = (props) => {

   const {
      handleSubmit,
      handleChangeInput,
      handleModalClose,
      modalIsOpen,
      form,
      emailValidate,
      roleValidate,
      sent,
      invited,
      errorInvited,
      handleModalCloseConfirm,
   } = props;
   const user = JSON.parse(window.sessionStorage.getItem('user'));
   return (
      <>
         <Modal
         isOpen={modalIsOpen}
         handleModalClose={handleModalClose}
         isModalAddRole
         >
            <button
            type='button'
            className='isModalAddRole__close'
            onClick={handleModalClose}
            >X</button>
            <h2>Invitar Usuario</h2>
            <form onSubmit={handleSubmit}>
               <label htmlFor='email'>Correo: <i>*</i>
                  <input
                     type='text'
                     name='email'
                     value={form.email}
                     placeholder='ejemplo@correo.com'
                     onChange={handleChangeInput}
                  />
                  {emailValidate && <p className='alert-form'>Formato de correo ejemplo@correo.com.</p>}
               </label>
               {user.role === 'SuperAdministrador'
                  ? <label htmlFor='role'>
                     Rol: <i>*</i>
                     <select  name='role' value={form.role} onChange={handleChangeInput}>
                        <option value=''>Rol</option>
                        <option value='empleado'>Empleado</option>
                        <option value='administrador'>Administrador</option>
                     </select>
                     <i className='Arrow'> </i>
                  {roleValidate &&
                           <p className='alert-form'>Seleccione el rol de la cuenta a crear.</p>}
                  </label>
                  : null
               }
               <div>
                  <button type='submit' className='btn'>Invitar</button>
               </div>
            </form>
         </Modal>
         <Modal
            isOpen={sent}
            isConfirmation
         >
            <button type='button' onClick={handleModalCloseConfirm}>X</button>
               {invited && <p>Invitación enviada.</p>}
               {errorInvited && <p>Hubo error al enviar la invitación, intenta de nuevo.</p>}
            <div>
               <button type='button' onClick={handleModalCloseConfirm}>Aceptar</button>
            </div>
         </Modal>
      </>
   );

}
export default RoleAddModal;