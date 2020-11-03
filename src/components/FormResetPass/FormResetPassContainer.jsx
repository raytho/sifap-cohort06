import React, { useState } from 'react';

import FormResetPass from './FormResetPass';

const FormResetPassContainer = () => {

   const API = 'https://ancient-fortress-28096.herokuapp.com/api/';
   const [form, setValues] = useState({
      email: ''
   });
   const [emailValidate, setEmailValidate] = useState(true);
   const [notEmail, setNotEmail] = useState(false);
   const [modal, setModal] = useState(false);
   const handleInputChange = e => {
      setValues({
         ...form,
         [e.target.name]: e.target.value,
      })
   }
   const handleSubmit = e => {
      e.preventDefault();
      if(Object.keys(form.email).length) {
         setEmailValidate(true)
         const postData = async () => {
            try {
               await fetch(`${API}auth/forgot`, {
                  method: 'POST',
                  headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(form)
               }).then(async response => {
                  window.console.log(response);
                  const { message, error } = await response.json();
                  if(error) {
                     setNotEmail(true)
                  } else if (message) {
                     // se abre modal
                     setModal(true)
                     setNotEmail(false)
                     window.console.log('Se ha enviado un link a tu correo')
                  }
               }).catch(error => window.console.log(error))
            } catch(error) {
               window.console.log(error)
            }
         }
         postData()
      } else {
         setEmailValidate(false)
      }
   }
   const handleModalClose = () => {
      setModal(false);
   }

    return (
        <FormResetPass
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            form={form}
            emailValidate={emailValidate}
            notEmail={notEmail}
            modal={modal}
            handleModalClose={handleModalClose}
        />
    )
}

export default FormResetPassContainer;