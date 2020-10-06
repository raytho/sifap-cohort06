import React from 'react';
import Header from '../components/Header/Header';
import AsideLogo from '../components/AsideLogo';
import LoginSlides from '../components/FormLogin/LoginSlidees'
import FormLoginContainer from '../components/FormLogin/FormLoginContainer';


import '../assets/styles/components/Login/Login.scss';
import '../assets/styles/utils/Alerts.scss';

const Login = () => {
    return (
        <>
            <Header />
            <div className='Login__container'>
                <div className='Login__aside'>
                    <AsideLogo SignUpLogo/>
                    <FormLoginContainer/>
                </div>
                
                <LoginSlides/>
            </div>
        </>
    )
}

export default Login;
