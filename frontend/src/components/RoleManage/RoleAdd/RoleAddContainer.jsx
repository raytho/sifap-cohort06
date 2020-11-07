/* eslint-disable react/require-default-props */
/* eslint-disable consistent-return */
import React, { useState } from 'react';
import PropTypes from 'prop-types'
import RoleAddCtrl from './RoleAddCtrl';

const RoleAddContainer = ({ dataLength }) => {

   const RegExEmail = /^(([^<>()\\[\]\\.,;:\s@”]+(\.[^<>()\\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
   const token = window.sessionStorage.getItem('token');
   const API = 'https://ancient-fortress-28096.herokuapp.com/api/';
   const user = JSON.parse(window.sessionStorage.getItem('user'));
   const [modal, setModal] = useState(false);
   const [emailValidate, setEmailValidate] = useState(false);
   const [roleValidate, setRoleValidate] = useState(false);
   const [invited, setInvited] = useState(false);
   const [errorInvited, setErrorInvited] = useState(false);
   const [sent, setSent] = useState(false);
   const [form, setValues] = useState({
      email: '',
      role: ''
   });
   // Manage input
   const handleChangeInput = e => {
      setValues({
         ...form,
         [e.target.name]: e.target.value,
      });
   }
   // Manage Modal
   const handleModalOpen = () => {
      setModal(true);
   }
   const handleModalClose = () => {
      setModal(false);
   }
   const handleModalCloseConfirm = () => {
      setSent(false);
   }

   // Validate forms
   const validateForm = () => {
      let email;
      let role;

      if(RegExEmail.test(form.email)) {
         email = true;
         setEmailValidate(false);
      } else {
         setEmailValidate(true);

      }
      if (user.role === 'Administrador') {
         role = true;
         setRoleValidate(false);
      } else if(form.role === undefined || form.role.length === 0) {

         setRoleValidate(true);

      } else {
         role = true;
         setRoleValidate(false);

      }
      if(email && role) {
         return true
      }
   }
   // Super admin create new user admin/employee
   const handleSubmit = e => {
      e.preventDefault();
      if (validateForm()) {
         setModal(false);
         if (user.role === 'Administrador') {
            form.role = 'empleado';
         }
         const postData = async () => {
            try {
               const response = await fetch(`${API}superAdmin/invite-user`, {
                  method: 'POST',
                  headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json',
                     'Authorization': `Bearer ${token}`
                  },
                  body: JSON.stringify(form)
               })
               const { message } = await response.json();
               if (message === 'Invitation sent') {
                  setInvited(true)
                  setSent(true)
               } else {
                  setErrorInvited(true);
                  setSent(true)
               }
               form.email = '';
               form.role = '';
            } catch (error) {
               window.console.log(error.message);
            }
         };
         postData();
      }
   }

   return (
      <RoleAddCtrl
         handleSubmit={handleSubmit}
         handleModalClose={handleModalClose}
         handleModalOpen={handleModalOpen}
         handleChangeInput={handleChangeInput}
         form={form}
         modalIsOpen={modal}
         emailValidate={emailValidate}
         roleValidate={roleValidate}
         dataLength={dataLength}
         invited={invited}
         errorInvited={errorInvited}
         sent={sent}
         handleModalCloseConfirm={handleModalCloseConfirm}
      />
   )

}

RoleAddContainer.propTypes = {
   dataLength: PropTypes.number,
   // handleNewUserGrandchild: PropTypes.func,
}

export default RoleAddContainer;