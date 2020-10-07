/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
import React, { useState, useContext } from 'react'
import { Context } from '../../Context';

import FormRegister from './FormRegister'

const SignUpContainer = ({ history }) => {

   const RegExEmail = /^(([^<>()\\[\]\\.,;:\s@”]+(\.[^<>()\\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
   const RegExPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
   const [form, setValues] = useState({
      email: '',
      password: '',
      country: '',
   });
   const { activateAuth } = useContext(Context)
   const [emailValidate, setEmailValidate] = useState(false);
   const [passwordValidate, setPasswordValidate] = useState(false);
   const [countryValidate, setCountryValidate] = useState(false);
   const [typeEmailValidate, setTypeEmailValidate] = useState(false);
   window.console.log(form)
   const handleChangeInput = e => {
      setValues({
         ...form,
         [e.target.name]: e.target.value
      })
   }
   const validateForm = () => {
      let email;
      let typeEmail;
      let password;
      let country;

      if(RegExEmail.test(form.email)) {
         email = true;
         setEmailValidate(false);
      } else {
         setEmailValidate(true);
      }
      if (form.typeEmail !== undefined) {
         typeEmail = true;
         setTypeEmailValidate(false);
      } else {
         setTypeEmailValidate(true);
      }
      if (RegExPassword.test(form.password)) {
         password = true;
         setPasswordValidate(false);
      } else {
         setPasswordValidate(true);
      }
      if (Object.keys(form.country).length > 4) {
         country = true;
         setCountryValidate(false);
      } else {
         setCountryValidate(true);
      }

      if(email && password && country && typeEmail) {
         return true
      }
   }
   const handleSubmit = e => {
      e.preventDefault()
      if (validateForm()) {
         const postData = async () => {
            try {
               await fetch('https://ancient-fortress-28096.herokuapp.com/api/auth/sign-up ', {
                  method: 'POST',
                  headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(form)
               }).then(response => {
                  window.console.log(response)
                  activateAuth()
                  history.push('/')
               })
            } catch (error) {
               window.console.log(error)
            }
         }
         postData();
      }
   }

   return (
      <FormRegister
         handleSubmit={handleSubmit}
         handleChangeInput={handleChangeInput}
         form={form}
         emailValidate={emailValidate}
         passwordValidate={passwordValidate}
         countryValidate={countryValidate}
         typeEmailValidate={typeEmailValidate}
       />
   )
}

export default SignUpContainer;