/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Header from '../components/Header/Header';
import AsideLogo from '../components/AsideLogo';
import RegisterSlides from '../components/FormRegister/RegisterSlides';
import FormRegisterContainer from '../components/FormRegister/FormRegisterContainer'

import '../assets/styles/components/Register/Register.scss';
import '../assets/styles/utils/Alerts.scss';

const Register = () => {

   return (
      <>
         <Header />
         <div className='SignUp__container'>
            <div className='SignUp__aside'>
               <AsideLogo SignUpLogo/>
               <FormRegisterContainer />
            </div>
            <RegisterSlides />
         </div>
      </>
   )
}

export default Register;
