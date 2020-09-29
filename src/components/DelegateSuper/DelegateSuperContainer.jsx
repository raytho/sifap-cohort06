/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
import React, { useState } from 'react';

import DelegateSuper from './DelegateSuper';


const DelegateSuperContainer = () => {

   const [modal, setModal] = useState(false);
   // const [confirm, setConfirm] = useState(false);
   const [form, setValues] = useState({
      name: '',
      email: '',
   });
   const [nameValidate, setNameValidate] = useState(false)
   const [emailValidate, setEmailValidate] = useState(false)
   const [accountValidate, setAccountValidate] = useState(false)
   const handleChangeInput = (e) => {
      const { name, value } = e.target;

      setValues({
         ...form,
         [name]: value
      })
   }
   const validateForm = () => {

      let name;
      let email;
      let account;

      if (/^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\\']+[\s])+([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\\'])+[\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\\'])?$/g.test(form.name)) {
         name = true;
         setNameValidate(false);

      } else {
         setNameValidate(true);

      }
      if(/^(([^<>()\\[\]\\.,;:\s@”]+(\.[^<>()\\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/.test(form.email)) {
         email = true;
         setEmailValidate(false)
      } else {
         setEmailValidate(true)

      }
      if(form.account !== undefined) {
         account = true;
         setAccountValidate(false)

      } else {
         setAccountValidate(true)

      }

      if(email && name && account) {
         return true
      }
   }

   // const confirmSendForm = () => {
   //    // setConfirm(true)
   //    setModal(false);
   // }
   const handleModalOpen = () => {
      if (validateForm()) {
         setModal(true);
      }
   }
   const handleModalClose = () => {
      setModal(false);

   }
   const handleSubmit = (e) => {

      e.preventDefault();
      if (validateForm()) {
         window.console.log('ok')
      }

   }



   return (
      <DelegateSuper
         handleChangeInput={handleChangeInput}
         handleModalOpen={handleModalOpen}
         handleModalClose={handleModalClose}
         handleSubmit={handleSubmit}
         // confirmSendForm={confirmSendForm}
         modalIsOpen={modal}
         form={form}
         nameValidate={nameValidate}
         emailValidate={emailValidate}
         accountValidate={accountValidate}
      />
   );
}

export default DelegateSuperContainer;