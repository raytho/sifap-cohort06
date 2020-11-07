/* eslint-disable consistent-return */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormNewPass from './FormNewPass';

const FormNewPassContainer = (props) => {

   const {
      match
    } = props;

   const API = 'https://ancient-fortress-28096.herokuapp.com/api/';
   const idUser = match.params.id;
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
         delete form.passwordVerify;
         window.console.log(form)
         const postDataNewPassword = async () => {
            const response = await fetch(`${API}auth/password`, {
               method: 'POST',
               headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${idUser}`
               },
               body: JSON.stringify(form)
            });
            window.console.log(response);
            window.console.log(response.message);
         }
         postDataNewPassword();
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

FormNewPassContainer.propTypes = {
   match: PropTypes.objectOf(
      PropTypes.any
   ).isRequired
}
export default FormNewPassContainer;