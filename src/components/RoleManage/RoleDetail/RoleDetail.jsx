/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Roles from '../Roles';
import RoleDetailModal from './RoleDetailModal'

import iconEdit from '../../../assets/static/icon/edit.png';
import '../../../assets/styles/components/RoleManage/RoleManage.scss';


const RoleDetail = (props) =>  {

   const {
      loading,
      user,
      handleChangeInput,
      handleModalOpen,
      handleModalClose,
      modalIsOpen,
      form,
      goBack,
      handleClickEdit,
      editRole,
      handleSubmit
   } = props;
   window.console.log(user)
   return (
      <Roles>
          <div className='Role__manage-panel-detail'>
          {loading
          ? <p>Cargando...</p>
          :
          <>
            <div className='Role__header Role__header--detail'>
                  <button type='button' onClick={goBack}> </button>
            </div>
            <div className='Role__main Role__main--detail'>
               <div className='Role__detail-functionality'>
                  <form onSubmit={handleSubmit}>
                     <h2>{user.firstName} {user.lastName}</h2>
                     <p>
                        <span>Role: </span> {user.role}
                        <button type='button' onClick={handleClickEdit}>
                           <img src={iconEdit} alt='Icono de editar' />
                        </button>
                     </p>
                     {
                        editRole &&
                        <label htmlFor='role'>
                           <p>Cambiar rol de usuario</p>
                           <select
                              value={form.role}
                              name='role'
                              onChange={handleChangeInput}
                           >
                              <option value='employee'>Empleado</option>
                              <option value='administrador'>Administrador</option>
                           </select>
                        </label>
                     }
                     <p><span>ID: </span>{user.userId}</p>
                     <p><span>Correo: </span>{user.email}</p>
                     <div>
                        <h3>Seguridad:</h3>
                        <p>
                           Para mayor seguridad de este usuario, puedes activar autenticación en 2 pasos al momento de iniciar sesión por medio de un enlace a tu correo o un código en un mensaje de texto.
                        </p>
                        <label className='check segurity'>
                           <input  type='checkbox'
                              name='twoFactorActive'
                              onChange={handleChangeInput}
                           />
                           <span className='checkmark' />
                           Autenticación al iniciar sesión
                        </label>
                     </div>
               <button type='submit' className='Role__detail-btn'>Guardar</button>
                  </form>
               </div>
               <RoleDetailModal
                  handleModalClose={handleModalClose}
                  modalIsOpen={modalIsOpen}
               />
            </div>
         </>
         }
         </div>
      </Roles>
   );
}

export default RoleDetail;