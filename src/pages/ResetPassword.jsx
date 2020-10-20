/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
import AsideLogo from '../components/AsideLogo';
import LoginSlides from '../components/FormLogin/LoginSlidees';
import FormResetPassContainer from '../components/FormResetPass/FormResetPassContainer';

import '../assets/styles/components/ResetPassword/ResetPassword.scss';
import '../assets/styles/utils/Alerts.scss';


const ResetPassword = () => {
   return (
      <>
         <div className="ResetPass__container">
            <div className="ResetPass__aside">
               <AsideLogo SignUpLogo />
               <FormResetPassContainer />
            </div>
               <LoginSlides/>
         </div>
      </>
   )
}

export default ResetPassword;