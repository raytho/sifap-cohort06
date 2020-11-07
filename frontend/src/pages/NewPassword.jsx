import React from 'react';
import PropTypes from 'prop-types';
import AsideLogo from '../components/AsideLogo';
import LoginSlides from '../components/FormLogin/LoginSlidees';
import FormNewPassContainer from '../components/FormResetPass/FormNewPassContainer';

import '../assets/styles/components/ResetPassword/ResetPassword.scss';
import '../assets/styles/utils/Alerts.scss';


const NewPassword = (props) => {

   const { match } = props;

   return (
      <>
         <div className="ResetPass__container">
            <div className="ResetPass__aside">
               <AsideLogo SignUpLogo />
               <FormNewPassContainer
                  match={match}
               />
            </div>
               <LoginSlides/>
         </div>
      </>
   )
}

NewPassword.propTypes = {
   match: PropTypes.objectOf(
      PropTypes.any
   ).isRequired
}
export default NewPassword;