/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
import React, { useState, useContext } from 'react'
import { Context } from '../../Context';

import FormRegister from './FormRegister'

const SignUpContainer = ({ history }) => {

   const RegExEmail = /^(([^<>()\\[\]\\.,;:\s@”]+(\.[^<>()\\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
   const RegExPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
   const [form, setValues] = useState({
      name: '',
      identifier: '',
      email: '',
      password: '',
      passwordVerify: '',
      country: '',
   });
   const API = 'https://ancient-fortress-28096.herokuapp.com/api/';
   const { activateAuth } = useContext(Context)
   const [emailValidate, setEmailValidate] = useState(false);
   const [passwordValidate, setPasswordValidate] = useState(false);
   const [countryValidate, setCountryValidate] = useState(false);
   const [nameValidate, setNameValidate] = useState(false);
   const [identifierValidate, setIdentifierValidate] = useState(false);
   const [passwordVerifyValidate, setPasswordVerifyValidate] = useState(false);
   const handleChangeInput = e => {
      setValues({
         ...form,
         [e.target.name]: e.target.value
      })
   }
   const validateForm = () => {
      let email;
      let name;
      let identifier;
      let password;
      let passwordVerify;
      let country;

      if(RegExEmail.test(form.email)) {
         email = true;
         setEmailValidate(false);
      } else {
         setEmailValidate(true);
      }
      if (Object.keys(form.name).length > 3 ) {
         name = true;
         setNameValidate(false);
      } else {
         setNameValidate(true);
      }
      if (Object.keys(form.identifier).length > 6 ) {
         identifier = true;
         setIdentifierValidate(false);
      } else {
         setIdentifierValidate(true);
      }
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
      if (Object.keys(form.country).length > 4) {
         country = true;
         setCountryValidate(false);
      } else {
         setCountryValidate(true);
      }

      if(email && password && country && name && identifier && passwordVerify) {
         return true
      }
   }
   const handleSubmit = e => {
      e.preventDefault();
      if (validateForm()) {
         const postData = async () => {
            try {
               await fetch(`${API}auth/sign-up`, {
                  method: 'POST',
                  headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(form)
               }).then(response => {
                  window.console.log(response.message);
                  activateAuth()
                  history.push('/')
               })
            } catch (error) {
               window.console.log(error)
            }
         }
         postData();
      }
      e.stopPropagation();

   }

   return (
      <FormRegister
         handleSubmit={handleSubmit}
         handleChangeInput={handleChangeInput}
         form={form}
         emailValidate={emailValidate}
         passwordValidate={passwordValidate}
         countryValidate={countryValidate}
         nameValidate={nameValidate}
         identifierValidate={identifierValidate}
         passwordVerify={passwordVerifyValidate}
       />
   )
}

export default SignUpContainer;