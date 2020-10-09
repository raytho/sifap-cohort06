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

   const [users, setUsers] = useState(true);
   const [filteredRole, setFilteredRole] = useState([]);
   const [filtered, setFiltered] = useState(false);
   const [filter, setFilter] = useState('')
   window.console.log(filter);
   const handleFilter = () => {
      document.getElementById('form-filter').classList.toggle('isVisible');
   }
   const handleChangeFilter = e => {
      setFilter(e.target.value)
   }
   // busqueda id general
   const result = data.filter(item => item.userId.toLowerCase().includes(filter.toLowerCase())  );
   // búsqueda de id con filtrado de roles
   // const resultWithFilteredRole = filteredRole.filter(item => item.userId.toLowerCase().includes(filter.toLowerCase()));
   window.console.log(result.length, 'result', result)
   const handleChangeFilterRole = e => {
      const resultRole = data.filter(item => item.role.toLowerCase() === e.target.value.toLowerCase())
      setFilteredRole(resultRole)
      setFiltered(true)
      if (e.target.value === 'rol') setFiltered(false)
   }

   if (result.length > 0) {
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
                     <select defaultValue='rol' onChange={handleChangeFilterRole}>
                        <option value='rol'>Rol</option>
                        <option value='Empleado'>Empleado</option>
                        <option value='Administrador'>Administrador</option>
                        <option value='SuperAdministrador'>Super Admin</option>
                     </select>
                     <i className='Arrow'> </i>
                  </label>
                     <input placeholder='ID' onChange={handleChangeFilter} />
                     <input placeholder='Nombre' onChange={handleChangeFilter}/>
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

                     {
                        filtered
                           ? <UserItem data={filteredRole}/>
                           : <UserItem data={result.length > 0 ? result : data}/>
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
      )
   }

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
                     <select defaultValue='rol' onChange={handleChangeFilterRole}>
                        <option value='rol'>Rol</option>
                        <option value='Empleado'>Empleado</option>
                        <option value='Administrador'>Administrador</option>
                        <option value='SuperAdministrador'>Super Admin</option>
                     </select>
                     <i className='Arrow'> </i>
                  </label>
                     <input placeholder='ID' onChange={handleChangeFilter} />
                     <input placeholder='Nombre' onChange={handleChangeFilter}/>
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
                  {/* {users
                  ? ( */}
                     {/* {
                        result.length > 0
                           ? <UserItem data={result}/>
                           : <UserItem data={data}/>
                     } */}
                     {

                        filtered
                           ? <UserItem data={result}/>
                           : <UserItem data={result.length > 0 ? result : data}/>
                     }
                  {/* )
                  : <UserItemInvited />
                  } */}
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
   data: PropTypes.array,
   handleModalOpen: PropTypes.func,
   handleModalClose: PropTypes.func,
   handleChangeInput: PropTypes.func,
   modalIsOpen: PropTypes.bool,
}

export default RoleManage;