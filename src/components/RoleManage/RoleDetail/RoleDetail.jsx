/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Roles from '../Roles';
import RoleDetailModal from './RoleDetailModal'
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
               <span>
                  <button type='button' onClick={goBack}> </button>
                  <p>{user.role}</p>
                  <p>{user.userId}</p>
                  <p>{user.firstName} {user.lastName}</p>
                  <p>{user.email}</p>
               </span>
            </div>
            <div className='Role__main Role__main--detail'>
               <div className='Role__detail-functionality'>
               <h2>Funcionalidades</h2>
                  <label htmlFor='role'>
                     Roles:
                     <p>Cambiar rol de usuario</p>
                     <select
                        value={form.role}
                        name='role'
                        onChange={handleChangeInput}
                     >
                        <option value='employee'>Empleado</option>
                        <option value='administrador'>Administrador</option>
                     </select>
                     <i className='Arrow'> </i>
                  </label>
                  <p>Agrega o quita funciones:</p>
                  <form>
                     <label className='check'>
                        <input
                           type='checkbox'
                           name='bill'
                           onChange={handleChangeInput}
                        />
                        <span className='checkmark' />
                        Generar Facturas
                     </label>
                     <label className='check'>
                        <input
                           type='checkbox'
                           name='history'
                           onChange={handleChangeInput}
                        />
                        <span className='checkmark' />
                        Historial
                     </label>
                     <label className='check'>
                        <input
                           type='checkbox'
                           name='stats'
                           onChange={handleChangeInput}
                        />
                        <span className='checkmark' />
                        Estadísticas
                     </label>
                     <label className='check'>
                        <input
                           type='checkbox'
                           name='customer'
                           onChange={handleChangeInput}
                           />
                        <span className='checkmark' />
                        Clientes
                     </label>
                     <label className='check'>
                        <input
                           type='checkbox'
                           name='maganage-roles'
                           onChange={handleChangeInput}
                        />
                        <span className='checkmark' />
                        Roles
                     </label>
                  </form>
                  <form>
                     <h3>Seguridad:</h3>
                     <p>
                        Para mayor seguridad de este usuario, puedes activar autenticación en 2 pasos al momento de iniciar sesión por medio de un enlace a tu correo o un código en un mensaje de texto.
                     </p>
                     <label className='check segurity'>
                        <input  type='checkbox'
                           name='autentication'
                           onChange={handleChangeInput}
                        />
                        <span className='checkmark' />
                        Autenticación al iniciar sesión
                     </label>
                  </form>
               </div>
               <button type='button' className='Role__detail-btn' onClick={handleModalOpen}>Guardar</button>
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