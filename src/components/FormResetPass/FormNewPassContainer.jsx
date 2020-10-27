/* eslint-disable consistent-return */
import React, { useState } from 'react';
import FormNewPass from './FormNewPass';

const FormNewPassContainer = () => {

   const RegExPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
   const [passwordVerifyValidate, setPasswordVerifyValidate] = useState(false);
   const [passwordValidate, setPasswordValidate] = useState(false);

   const [form, setValues] = useState({
      password: '',
      passwordVerify: '',
   })

   const handleInputChange = e => {
      setValues({
         ...form,
         [e.target.name]: e.target.value,
      })
   }

   const validateForm = () => {
      let password;
      let passwordVerify;

      if (RegExPassword.test(form.password)) {
         password = true;
         setPasswordValidate(false);
      } else {
         setPasswordValidate(true);
      }
      if (form.password === form.passwordVerify) {
         passwordVerify = true;
         setPasswordVerifyValidate(false);
      } else {
         setPasswordVerifyValidate(true);
      }

      if(password  && passwordVerify) {
         return true
      }
   }
   const handleSubmit = e => {
      e.preventDefault();
      if (validateForm()) {
         window.console.log('enviar nueva contraseña')
      }
   }

   return (
      <FormNewPass
         handleInputChange={handleInputChange}
         handleSubmit={handleSubmit}
         passwordVerifyValidate={passwordVerifyValidate}
         passwordValidate={passwordValidate}
         form={form}
      />
   );
}

export default FormNewPassContainer;