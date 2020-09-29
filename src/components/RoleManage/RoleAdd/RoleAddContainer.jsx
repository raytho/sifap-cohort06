/* eslint-disable react/require-default-props */
/* eslint-disable consistent-return */
import React, { useState } from 'react';
import PropTypes from 'prop-types'
import RoleAddCtrl from './RoleAddCtrl';

const RoleAddContainer = ({ dataLength, handleNewUser }) => {

   const [modal, setModal] = useState(false);
   const [form, setValues] = useState({
      email: '',
      firstName: '',
   });
   const [nameValidate, setNameValidate] = useState(false);
   const [emailValidate, setEmailValidate] = useState(false);
   const [roleValidate, setRoleValidate] = useState(false);

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

      if (Object.keys(form.firstName).length > 0) {
         name = true;
         setNameValidate(false);
      } else {
         setNameValidate(true);
      }
      if(/^(([^<>()\\[\]\\.,;:\s@”]+(\.[^<>()\\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/.test(form.email)) {
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
   const API = 'https://ancient-fortress-28096.herokuapp.com/api/'
   const handleSubmit = e => {
      e.preventDefault();
      if (validateForm()) {
         setModal(false);
         const getData = async () => {
            try {
               await fetch(`${API}superAdmin/invite-user`, {
                  method: 'POST',
                  headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(form)
               });
               handleNewUser()
            } catch (error) {
               window.console.log(error.message);
            }
         };
         getData();
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
   handleNewUser: PropTypes.func,
}

export default RoleAddContainer;