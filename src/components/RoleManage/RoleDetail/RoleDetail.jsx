/* eslint-disable no-unneeded-ternary */
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
      handleModalClose,
      modalIsOpen,
      form,
      goBack,
      handleClickEdit,
      editRole,
      loader,
      saved,
      handleSubmit
   } = props;

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
                              <option value={user.role.toLowerCase()}>Role</option>
                              <option value='empleado'>Empleado</option>
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
                              checked={form.twoFactorActive ? true : false}
                           />
                           <span className='checkmark' />
                           Autenticación al iniciar sesión
                        </label>
                     </div>
                     <div>
                        <div>
                           {loader && <p>Cargando...</p>}
                           {saved && <p>Se guardaron los cambios</p>}
                        </div>
                        <button type='submit' className='Role__detail-btn'>Guardar</button>
                     </div>
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