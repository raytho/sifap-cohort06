/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
import AsideLogo from '../components/AsideLogo';
import ResetPassContainer from '../components/FormResetPass/FormResetPassContainer';
import Header from '../components/Header/Header';

import '../assets/styles/components/Register/Register.scss';
import '../assets/styles/utils/Alerts.scss';


const ResetPassword = () => {
    return (
        <>
            <Header />
            <div className="ResetPass__container">
                <div className="ResetPass__aside">
                    <AsideLogo SignUpLogo />
                    <ResetPassContainer />
                </div>
            </div>
        </>
    )
}

export default ResetPassword;