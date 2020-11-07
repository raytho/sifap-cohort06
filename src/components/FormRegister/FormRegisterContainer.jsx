/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";

import FormRegister from './FormRegister'

const SignUpContainer = () => {

   const RegExEmail = /^(([^<>()\\[\]\\.,;:\s@”]+(\.[^<>()\\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
   const RegExPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
   const [form, setValues] = useState({
      firstName: '',
      // fiscalId: '',
      email: '',
      password: '',
      passwordVerify: '',
      country: '',
   });
   const history = useHistory()
   const API = 'https://ancient-fortress-28096.herokuapp.com/api/';
   const controller = new AbortController();
   const [countries, setCountries] = useState([])
   const [emailValidate, setEmailValidate] = useState(false);
   const [passwordValidate, setPasswordValidate] = useState(false);
   const [countryValidate, setCountryValidate] = useState(false);
   const [nameValidate, setNameValidate] = useState(false);
   // const [fiscalIdValidate, setFiscalIdValidate] = useState(false);
   const [passwordVerifyValidate, setPasswordVerifyValidate] = useState(false);
   const [emailUsed, setEmailUsed] = useState(false);
   const [modalConfirm, setModalConfirm] = useState(false);
   const [invited, setInvited] = useState(false);
   const handleChangeInput = e => {
      setValues({
         ...form,
         [e.target.name]: e.target.value
      })
   }
   const validateForm = () => {
      let email;
      let name;
      // let fiscalId;
      let password;
      let passwordVerify;
      let country;

      if(RegExEmail.test(form.email)) {
         email = true;
         setEmailValidate(false);
      } else {
         setEmailValidate(true);
      }
      if (Object.keys(form.firstName).length > 3 ) {
         name = true;
         setNameValidate(false);
      } else {
         setNameValidate(true);
      }
      // if (Object.keys(form.fiscalId).length > 5 ) {
      //    fiscalId = true;
      //    setFiscalIdValidate(false);
      // } else {
      //    setFiscalIdValidate(true);
      // }
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
      if (Object.keys(form.country).length > 2) {
         country = true;
         setCountryValidate(false);
      } else {
         setCountryValidate(true);
      }

      if(email && password && country && name && passwordVerify) {
         return true
      }
   }
   window.console.log(form)
   const handleSubmit = e => {
      e.preventDefault();
      if (validateForm()) {
         const postData = async () => {
            try {
               const response = await fetch(`${API}auth/sign-up`, {
                  method: 'POST',
                  headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(form)
               })
               const { message } = await response.json();
               window.console.log(message)
               if(message === 'No se puede registrar un usuario sin invitacion, favor de validar') {
                  setInvited(true);
               } else {
                  setInvited(false);
               }
               if (response.status === 200) {
                  setEmailUsed(true)
               } else if (response.status === 201) {
                  setModalConfirm(true)
               }
            } catch (error) {
               window.console.log(error)
            }
         }
         postData();
      }
      e.stopPropagation();
   }
   const handleModalClose = () => {
      setModalConfirm(false);
      history.push('/');
   }

   useEffect(() => {
      const getData = async () => {
         try {
            const response = await fetch(`${API}countries`, { signal: controller.signal });
            const data = await response.json();
            setCountries(data.data)
         } catch(error) {
            window.console.log(error)
         }
      }
      getData();
      return () => controller.abort()
   }, [])

   return (
      <FormRegister
         handleSubmit={handleSubmit}
         handleChangeInput={handleChangeInput}
         handleModalClose={handleModalClose}
         form={form}
         invited={invited}
         emailValidate={emailValidate}
         passwordValidate={passwordValidate}
         countryValidate={countryValidate}
         nameValidate={nameValidate}
         // fiscalIdValidate={fiscalIdValidate}
         passwordVerify={passwordVerifyValidate}
         countries={countries}
         emailUsed={emailUsed}
         modalConfirm={modalConfirm}
       />
   )
}

export default SignUpContainer;