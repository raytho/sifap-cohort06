import React from 'react';

import '../../assets/styles/components/Register/RegisterSlides.scss';

import LoginUno from '../../assets/static/images/login-1.png';
import LoginDos from '../../assets/static/images/login-2.png';
import LoginTres from '../../assets/static/images/login-3.png';

const LoginSlides = () => {
   return (
      <div className='SignUp__slide LogIn'>
         <h2>SIFAP <span> - Sistema de facturación para personas físicas con actividadempresarial.</span></h2>
         <ul>
            <li>
               <img src={LoginUno} alt='Slide' />
            </li>
            <li>
               <img src={LoginDos} alt='Slide' />
            </li>
            <li>
               <img src={LoginTres} alt='Slide' />
            </li>
         </ul>

         <div>
            <span> </span>
            <span> </span>
            <span> </span>
         </div>
         <div>
            <span className='fill'> </span>
         </div>
      </div>
   )
}

export default LoginSlides;