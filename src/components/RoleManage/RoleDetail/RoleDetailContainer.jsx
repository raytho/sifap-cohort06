/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import RoleDetail from './RoleDetail';

import mockRoles from '../../../../mockRoles';

// Aquí vamos a hacer las peticiones de los detalles de cada rol

const RoleDetailContainer = (props) => {

   const [modal, setModal] = useState(false)
   const [form, setValues] = useState({});

   const handleChangeInput = (e) => {

      if(e.target.name === 'role') {
         setValues({
            ...form,
            [e.target.name]: e.target.value,
         })
      } else {
         setValues({
            ...form,
            [e.target.name]: e.target.checked,
         })
      }
   }
   window.console.log(form);

   const handleModalOpen = () => {
      setModal(true);
   }

   const handleModalClose = () => {
      setModal(false)
   }

   const goBack = () => {
      props.history.goBack()
   }

   const { roles } = mockRoles;
   return (
      <RoleDetail
         role={roles[0]}
         handleChangeInput={handleChangeInput}
         handleModalOpen={handleModalOpen}
         handleModalClose={handleModalClose}
         modalIsOpen={modal}
         form={form}
         goBack={goBack}
      />
   )
};

export default RoleDetailContainer