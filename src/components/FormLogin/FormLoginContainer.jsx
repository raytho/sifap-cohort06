/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
import React, { useContext, useState } from 'react';
import { Context } from '../../Context';

import FormLogin from './FormLogin';

const LoginContainer = ({ history }) => {

   const LogExEmail = /^(([^<>()\\[\]\\.,;:\s@”]+(\.[^<>()\\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;

   const LogExPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
   const [form, setValues] = useState({
      email: '',
      password: '',
   });
   window.console.log(form);
   const API = 'https://ancient-fortress-28096.herokuapp.com/api/';
   const { activateAuth } = useContext(Context)
   const [emailValidate, setEmailValidate] = useState(false);
   const [passwordValidate, setPasswordValidate] = useState(false);
   const [loader, setLoader] = useState(true);
   const [modalTFA, setModalTFA] = useState(false);

   const handleChangeInput = e => {
      setValues({
         ...form,
         [e.target.name]: e.target.value
      })
   }
   const dataLogin = btoa(`${form.email}:${form.password}`);
   
   window.console.log(dataLogin)
   const validateForm = () => {
      let email;
      let password;

      if (LogExEmail.test(form.email)) {
         email = true;
         setEmailValidate(false);
      } else {
         setEmailValidate(true);
      }
      if (LogExPassword.test(form.password)) {
         password = true;
         setPasswordValidate(false);
      } else {
         setPasswordValidate(true);
      }
      if (email && password) {
         return true
      }
   }

   const handleSubmit = e => {
      e.preventDefault()
      if (validateForm()) {
         const postData = async () => {
               try {
                  await fetch(`${API}auth/sign-in`, {
                     method: 'POST',
                     headers: new Headers({
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Basic ${dataLogin}`,
                     }),
                     // body: JSON.stringify(form)
                  }).then(async response => {
                     const data = await response.json();
                     window.console.log(data.token);
                     activateAuth();
                     setLoader(false);
                     history.push('/');
                  })
               } catch (error) {
                  window.console.log(error)
               }
         }
         postData();
      }
   }

   const handleOpenModal = () => {
      setModalTFA(true)
   }

   const handleCloseModal = () => {
      setModalTFA(false)
   }

   return (
      <FormLogin
         handleOpenModal={handleOpenModal}
         handleCloseModal={handleCloseModal}
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