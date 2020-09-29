/* eslint-disable react/prop-types */
import React from 'react';

import RoleAddModal from './RoleAddModal';


const RoleAddCtrl = (props) => {

   const {
      handleSubmit,
      handleModalClose,
      handleModalOpen,
      handleChangeInput,
      form,
      sendUser,
      modalIsOpen,
      nameValidate,
      emailValidate,
      roleValidate,
      dataLength,
   } = props;

   return (
      <div>
         <p>Roles asignados</p>
         <span>
            <span>{dataLength}</span>
            <button type='button' onClick={handleModalOpen}>+</button>
            <RoleAddModal
               modalIsOpen={modalIsOpen}
               handleModalClose={handleModalClose}
               handleChangeInput={handleChangeInput}
               handleSubmit={handleSubmit}
               form={form}
               sendUser={sendUser}
               nameValidate={nameValidate}
               emailValidate={emailValidate}
               roleValidate={roleValidate}
            />
         </span>
      </div>
   )
}

export default RoleAddCtrl;