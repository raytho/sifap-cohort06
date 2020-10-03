/* eslint-disable consistent-return */
import React, { useState } from 'react'

import SignUp from './SignUp'

const SignUpContainer = () => {

   const RegExEmail = /^(([^<>()\\[\]\\.,;:\s@”]+(\.[^<>()\\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
   const RegExPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
   const [form, setValues] = useState({
      email: '',
      password: '',
      country: '',
   });

   const handleChangeInput = e => {
      setValues({
         ...form,
         [e.target.name]: e.target.value
      })
   }
   window.console.log(form)
   const [emailValidate, setEmailValidate] = useState(false);
   const [passwordValidate, setPasswordValidate] = useState(false);
   const [countryValidate, setCountryValidate] = useState(false);
   const [typeEmailValidate, setTypeEmailValidate] = useState(false);

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
               await fetch(url, {
                  method: 'POST',
                  headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(form)
               })
            } catch (error) {
               window.console.log(error)
            }
         }
         postData();
      }
   }

   return (
      <SignUp
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