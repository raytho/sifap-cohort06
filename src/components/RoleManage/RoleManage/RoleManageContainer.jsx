import React, { useState } from 'react';

import RoleManage from './RoleManage';
import GetData from '../../../containers/GetData'

const RoleManageContainer = () => {

   const API = 'https://ancient-fortress-28096.herokuapp.com/api/';
   const token = window.sessionStorage.getItem('token');
   const [modal, setModal] = useState(false);

   // Save data in sessionStorage, after send all data with button save of section Roles
   const setSessionStorage = value => {
      try {
         window.sessionStorage.setItem('authentifyAll', value)
      } catch (error) {
         window.console.log(error.message)
      }
   }
   const handleChangeInput = e => {
      setSessionStorage(e.target.checked)
   }

   // Manejo de modales
   const handleModalOpen = () => {
      setModal(true);
   }
   const handleModalClose = () => {
      setModal(false);
   }


   return (
      <GetData api={`${API}superAdmin/getInvitedUsersFilter`} token={token}>
         {
            ({ loading, error, data }) => {
               if(error) return <p>¡Error!</p>
               return (
                  <RoleManage
                     loading={loading}
                     data={data}
                     handleModalOpen={handleModalOpen}
                     handleModalClose={handleModalClose}
                     handleChangeInput={handleChangeInput}
                     modalIsOpen={modal}
                  />
               )
            }
         }
      </GetData>
   );
}

export default RoleManageContainer;