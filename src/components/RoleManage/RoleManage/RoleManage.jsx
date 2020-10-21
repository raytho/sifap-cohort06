/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types'

import Roles from '../Roles';
import RoleAddContainer from '../RoleAdd/RoleAddContainer';
import RoleManageModal from './RoleManageModal';
import UserFilter from './UserFilter';
import UserItemInvited from './UserItemInvited';
import '../../../assets/styles/components/RoleManage/RoleManage.scss';

const RoleManage = (props) => {

   const {
      loading,
      data,
      handleModalOpen,
      handleModalClose,
      handleChangeInput,
      modalIsOpen,
   } = props;

   const [users, setUsers] = useState(true);
   const [filterRole, setFilterRole] = useState([]);
   const [filterId, setFilterId] = useState('')
   const [filterName, setFilterName] = useState('')
   const [filteredName, setFilteredName] = useState(false)

   const [filterOpen, setFilterOpen] = useState(false)

   const handleFilter = () => {
      document.getElementById('form-filter').classList.toggle('isVisible');
      if (filterOpen) {
         setFilterOpen(false)
      } else {
         setFilterOpen(true)
      }
      // Limpieando filtros cuando se cierran
      setFilterId('')
      setFilterName('')
      setFilterRole([])
   }
   const handleChangeFilterId = e => {
      setFilterId(e.target.value)
   }
   const handleChangeFilterName = e => {
      setFilterName(e.target.value)
      setFilteredName(true)
      if (e.target.value === '') setFilteredName(false)
   }
   // búsqueda por nombre general
   const resultName = data.filter(item =>
      `${item.firstName} ${item.lastName}`.toLowerCase()
      .includes(filterName.toLowerCase())
   );
   // búsqueda por nombre filtrado por roles
   const resultNameWithFilteredRole = filterRole.filter(item =>
      `${item.firstName} ${item.lastName}`.toLowerCase()
      .includes(filterName.toLowerCase())
   );
   // búsqueda id general
   const resultId = data.filter(item =>
      item.userId.toLowerCase().includes(filterId.toLowerCase())
   );
   // búsqueda de id con filtrado de roles
   const resultIdWithFilteredRole = filterRole.filter(item =>
      item.userId.toLowerCase().includes(filterId.toLowerCase())
   );
   // filtrado por roles
   const handleChangeFilterRole = e => {
      const resultRole = data.filter(item =>
         item.role.toLowerCase() === e.target.value.toLowerCase()
      )
      setFilterRole(resultRole)
   }
   if (filterRole.length > 0) {
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
                     </label>
                     <input placeholder='ID' onChange={handleChangeFilterId} />
                     <input placeholder='Nombre' onChange={handleChangeFilterName}/>
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
                  <button
                     type='button'
                     onClick={() => setUsers(true)}
                  >Usuarios</button>
                  <button
                     type='button'
                     onClick={() => setUsers(false)}
                  >Usuarios invitados</button>
                  <div className='Role__item-container'>
                  {loading && <p>Cargando...</p>}
                  {users
                     ? <UserFilter
                        filteredName={filteredName}
                        resultUno={resultNameWithFilteredRole}
                        resultDos={resultIdWithFilteredRole}
                      />
                     : <UserItemInvited />
                  }
                  </div>
                  <div className='Role__panel-ctrl'>
                     <RoleAddContainer dataLength={filterRole.length} />
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
                     </label>
                     <input placeholder='ID' onChange={handleChangeFilterId} />
                     <input placeholder='Nombre' onChange={handleChangeFilterName}/>
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
                  <div className='Role__btn-users'>
                     <button
                        type='button'
                        onClick={() => setUsers(true)}
                     >Usuarios</button>
                     <button
                        type='button'
                        onClick={() => setUsers(false)}
                     >Usuarios invitados</button>
                  </div>
                  <div className='Role__item-container'>
                  {loading && <p>Cargando...</p>}
                  {users
                     ? <UserFilter
                        filteredName={filteredName}
                        resultUno={resultName}
                        resultDos={resultId}
                        />
                     : <UserItemInvited />
                  }
                  </div>
                  <div className='Role__panel-ctrl'>
                     <RoleAddContainer dataLength={resultId.length} />
                     {/* <button type='button' onClick={handleModalOpen}>Guardar</button> */}
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
   data: PropTypes.array.isRequired,
   handleModalOpen: PropTypes.func.isRequired,
   handleModalClose: PropTypes.func.isRequired,
   handleChangeInput: PropTypes.func.isRequired,
   modalIsOpen: PropTypes.bool.isRequired,
   loading: PropTypes.bool,
}

export default RoleManage;