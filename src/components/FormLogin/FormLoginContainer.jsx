/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
import React, { useContext, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Context } from '../../Context';

import FormLogin from './FormLogin';

const LoginContainer = () => {

   const [form, setValues] = useState({
      email: '',
      password: '',
   });
   const history = useHistory();
   const API = 'https://ancient-fortress-28096.herokuapp.com/api/';
   const { activateAuth, setUser, activeTFAToken } = useContext(Context)
   const [emailValidate, setEmailValidate] = useState(false);
   const [passwordValidate, setPasswordValidate] = useState(false);
   const [loader, setLoader] = useState(true);
   const [modalTFA, setModalTFA] = useState(false);
   const [credentials, setCredentials] = useState(false)
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

      if (Object.keys(form.email).length > 0) {
         email = true;
         setEmailValidate(false);
      } else {
         setEmailValidate(true);
      }
      if (Object.keys(form.password).length > 0) {
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
                  if(response.status === 500) {
                     setLoader(true);
                     setCredentials(true)
                  }
                  const { token, user } = await response.json();
                  if (loader) {
                     if (user.twoFactorActive) {
                        activeTFAToken(token);
                        handleModalOpen();
                     } else {
                        setUser(JSON.stringify(user));
                        activateAuth(token);
                        history.push('/emitir-facturas')
                     }
                  }
               }).catch(error => window.console.error(error));
            } catch (error) {
               window.console.log(error)
            }
         }
         setLoader(false);
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
         credentials={credentials}
      />
   )
}

export default LoginContainer;