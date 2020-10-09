/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
import React, { useContext, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Context } from '../../Context';

import FormLogin from './FormLogin';

const LoginContainer = () => {

   const LogExEmail = /^(([^<>()\\[\]\\.,;:\s@”]+(\.[^<>()\\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;

   const LogExPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
   const [form, setValues] = useState({
      email: '',
      password: '',
   });
   const history = useHistory();
   const API = 'https://ancient-fortress-28096.herokuapp.com/api/';
   const { activateAuth, getUser } = useContext(Context)
   const [emailValidate, setEmailValidate] = useState(false);
   const [passwordValidate, setPasswordValidate] = useState(false);
   const [loader, setLoader] = useState(true);
   const [modalTFA, setModalTFA] = useState(false);
   const dataLogin = btoa(`${form.email}:${form.password}`);

   const handleChangeInput = e => {
      setValues({
         ...form,
         [e.target.name]: e.target.value
      })
   }

   const validateForm = () => {
      let email;
      let password;

      if (LogExEmail.test(form.email)) {
         email = true;
         setEmailValidate(false);
      } else {
         setEmailValidate(true);
      }
      if (true) {
         // LogExPassword.test(form.password)
         password = true;
         setPasswordValidate(false);
      } else {
         setPasswordValidate(true);
      }
      if (email && password) {
         return true
      }
   }
   const handleModalOpen = () => {
      setModalTFA(true)
   }

   const handleModalClose = () => {
      setModalTFA(false)
      setLoader(true);
   }

   const handleSubmit = e => {
      e.preventDefault()
      if (validateForm()) {
         const postData = async () => {
            try {
               await fetch(`${API}auth/sign-in`, {
                  method: 'POST',
                  headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json',
                     'Authorization': `Basic ${dataLogin}`,
                  },
               }).then(async response => {
                  const { token, user } = await response.json();
                  window.console.log(user.twoFactorActive)
                  if (loader) {
                     if (user.twoFactorActive) {
                        window.console.log(token);
                        handleModalOpen()
                     } else {
                        window.console.log(token);
                        activateAuth(token);
                        getUser(user)
                        history.push('/bill')
                     }
                  }
               })
            } catch (error) {
               window.console.log(error)
            }
         }
         setLoader(false);
         console.log(loader, 'out')
         postData();
      }
   }


   return (
      <FormLogin
         handleModalOpen={handleModalOpen}
         handleModalClose={handleModalClose}
         modalTFA={modalTFA}
         handleSubmit={handleSubmit}
         handleChangeInput={handleChangeInput}
         form={form}
         emailValidate={emailValidate}
         passwordValidate={passwordValidate}
         loader={loader}
      />
   )
}

export default LoginContainer;