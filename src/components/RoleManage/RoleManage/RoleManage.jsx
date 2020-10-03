/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types'

import Roles from '../Roles';
import RoleAddContainer from '../RoleAdd/RoleAddContainer';
import RoleManageModal from './RoleManageModal';
import UserItem from './UserItem';
import UserItemInvited from './UserItemInvited';
import '../../../assets/styles/components/RoleManage/RoleManage.scss';

const RoleManage = (props) => {

   const {
      // loading,
      data,
      handleModalOpen,
      handleModalClose,
      handleChangeInput,
      modalIsOpen,
   } = props;
   const [users, setUsers] = useState(true)
   const handleFilter = () => {
      document.getElementById('form-filter').classList.toggle('isVisible');
   }
   // Intentando filtrar
   // window.console.log(
   //    data.map(item => item.firstName)
   // )
   return (
      <Roles >
         <section className='Role'>
            <div className='Role__autentication'>
               <h3>Seguridad:</h3>
               <p>
                  Para mayor seguridad con manejo de usuarios, puedes activar autenticación en 2 pasos al momento de iniciar sesión por medio de un enlace a tu correo o un código en un mensaje de texto, <span>esto aplicará a todos los usuarios.</span>
               </p>
               <label className='check'>Activar Autenticación
                  <input
                     type='checkbox'
                     name='authentifyAll'
                     onChange={handleChangeInput}
                     />
                  <span className='checkmark' />
               </label>
            </div>
            <div className='Role__manage-panel'>
               <div className='Role__filter'>
                  <form id='form-filter' className='isVisible'>
                  <label htmlFor='rol'>
                     <select defaultValue='rol'>
                        <option  value='rol'>Rol</option>
                        <option value='empleado'>Empleado</option>
                        <option value='administrador'>Administrador</option>
                     </select>
                     <i className='Arrow'> </i>
                  </label>
                     <input placeholder='ID'/>
                     <input placeholder='Nombre'/>
                  </form>
                  <button type='button' onClick={handleFilter} >Filtrar</button>
               </div>
               <div className='Role__header'>
                  <span>
                     <p>Rol</p>
                     <p>ID</p>
                     <p>Nombre</p>
                  </span>
               </div>
               <div className='Role__main'>
                  <button type='button' onClick={() => setUsers(true)}>Usuarios</button>
                  <button type='button' onClick={() => setUsers(false)}>Usuarios invitados</button>
                  <div className='Role__item-container'>
                  {users
                  ? (
                    <UserItem data={data}/>
                  )
                  : <UserItemInvited />
                  }
                  </div>
                  <div className='Role__panel-ctrl'>
                     <RoleAddContainer dataLength={data.length} />
                     <button type='button' onClick={handleModalOpen}>Guardar</button>
                     <RoleManageModal
                        handleModalClose={handleModalClose}
                        modalIsOpen={modalIsOpen}
                     />
                  </div>
               </div>
            </div>
         </section>
      </Roles>
   );
};

RoleManage.propTypes = {
   data: PropTypes.arrayOf(PropTypes.shape()),
   handleModalOpen: PropTypes.func,
   handleModalClose: PropTypes.func,
   handleChangeInput: PropTypes.func,
   modalIsOpen: PropTypes.bool,
}

export default RoleManage;