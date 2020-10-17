import React from 'react';
import Header from '../components/Header/Header';
import AsideLogo from '../components/AsideLogo';
import LoginSlides from '../components/FormLogin/LoginSlidees';
import FormNewPassContainer from '../components/FormResetPass/FormNewPassContainer';

import '../assets/styles/components/ResetPassword/ResetPassword.scss';
import '../assets/styles/utils/Alerts.scss';


const NewPassword = () => {
   return (
      <>
         <Header />
         <div className="ResetPass__container">
            <div className="ResetPass__aside">
               <AsideLogo SignUpLogo />
               <FormNewPassContainer />
            </div>
               <LoginSlides/>
         </div>
      </>
   )
}

export default NewPassword;