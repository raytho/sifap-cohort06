/* eslint-disable react/require-default-props */
/* eslint-disable consistent-return */
import React, { useState } from 'react';
import PropTypes from 'prop-types'
import RoleAddCtrl from './RoleAddCtrl';

const RoleAddContainer = ({ dataLength }) => {

   const RegExEmail = /^(([^<>()\\[\]\\.,;:\s@”]+(\.[^<>()\\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
   const token = window.sessionStorage.getItem('token');
   const API = 'https://ancient-fortress-28096.herokuapp.com/api/'
   const [modal, setModal] = useState(false);
   const [nameValidate, setNameValidate] = useState(false);
   const [emailValidate, setEmailValidate] = useState(false);
   const [roleValidate, setRoleValidate] = useState(false);
   const [form, setValues] = useState({
      email: '',
      firstName: '',
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

   // Validate forms
   const validateForm = () => {
      let name;
      let email;
      let role;

      if (Object.keys(form.firstName).length > 2) {
         name = true;
         setNameValidate(false);
      } else {
         setNameValidate(true);
      }
      if(RegExEmail.test(form.email)) {
         email = true;
         setEmailValidate(false);
      } else {
         setEmailValidate(true);

      }
      if(form.role !== undefined) {
         role = true;
         setRoleValidate(false);

      } else {
         setRoleValidate(true);

      }

      if(email && name && role) {
         return true
      }
   }
   // Super admin create new user admin/employee
   const handleSubmit = e => {
      e.preventDefault();
      if (validateForm()) {
         setModal(false);
         const postData = async () => {
            try {
               await fetch(`${API}superAdmin/invite-user`, {
                  method: 'POST',
                  headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json',
                     'Authorization': `Bearer ${token}`
                  },
                  body: JSON.stringify(form)
               }).then(async response => {
                  window.console.log(response)
                  const { data } = await response;
                  window.console.log(data)
               });
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
         nameValidate={nameValidate}
         emailValidate={emailValidate}
         roleValidate={roleValidate}
         dataLength={dataLength}
      />
   )

}

RoleAddContainer.propTypes = {
   dataLength: PropTypes.number,
   // handleNewUserGrandchild: PropTypes.func,
}

export default RoleAddContainer;