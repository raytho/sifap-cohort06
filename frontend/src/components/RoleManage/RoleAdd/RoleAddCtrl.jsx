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
      emailValidate,
      roleValidate,
      dataLength,
      invited,
      errorInvited,
      sent,
      handleModalCloseConfirm
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
               emailValidate={emailValidate}
               roleValidate={roleValidate}
               sent={sent}
               invited={invited}
               errorInvited={errorInvited}
               handleModalCloseConfirm={handleModalCloseConfirm}
            />
         </span>
      </div>
   )
}

export default RoleAddCtrl;