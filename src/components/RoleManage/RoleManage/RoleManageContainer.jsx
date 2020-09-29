import React, { useState } from 'react';

import RoleManage from './RoleManage';

const RoleManageContainer = () => {
/* En los componentes container esta la lógica de peticiones (fetching de datos)
   Por ahora no tenemos las peticiones, pero dejamos listo el componente para ello */

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

   const [modal, setModal] = useState(false);
   // Manejo de modales
   const handleModalOpen = () => {
      setModal(true);
   }
   const handleModalClose = () => {
      setModal(false);
   }

   return (
      <RoleManage
         handleModalOpen={handleModalOpen}
         handleModalClose={handleModalClose}
         handleChangeInput={handleChangeInput}
         modalIsOpen={modal}
      />
   );
}

export default RoleManageContainer;