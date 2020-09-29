/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React,{ useEffect ,useState } from 'react';
import PropTypes from 'prop-types'

import Roles from '../Roles';
import RoleItem from '../RoleItem';
import RoleAddContainer from '../RoleAdd/RoleAddContainer';
import RoleManageModal from './RoleManageModal';
import '../../../assets/styles/components/RoleManage/RoleManage.scss';




const RoleManage = (props) => {

   const {
      handleModalOpen,
      handleModalClose,
      handleChangeInput,
      modalIsOpen,
   } = props;
   const [data, setData] = useState([]);
   const [newUser, setNewUser] = useState(false);
   // Function called for the child component RoleAddContainer each time than add user
   const handleNewUser = () => {
      setNewUser(true)
   }


   const API = 'https://ancient-fortress-28096.herokuapp.com/api/'
   useEffect(() => {
      const getData = async () => {
         try {
            const response = await fetch(`${API}superAdmin/getAllUsers`);
            const result = await response.json();
            setData(result);
            setNewUser(false)
         } catch (error) {
            window.console.log(error.message);
         }
      };
      getData()

   }, [newUser]);
   const handleFilter = () => {
      document.getElementById('form-filter').classList.toggle('isVisible');
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
                  <div className='Role__item-container'>
                     {data.map(item => <RoleItem
                        key={item.userId}
                        {...item}
                     />)}
                  </div>
                  <div className='Role__panel-ctrl'>
                     <RoleAddContainer dataLength={data.length} handleNewUser={handleNewUser}/>
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
   handleModalOpen: PropTypes.func,
   handleModalClose: PropTypes.func,
   handleChangeInput: PropTypes.func,
   modalIsOpen: PropTypes.bool,
}

export default RoleManage;