import React from 'react';

import '../../assets/styles/components/Register/RegisterSlides.scss';

import RegisterUno from '../../assets/static/images/register-1.png';
import RegisterDos from '../../assets/static/images/register-2.png';
import RegisterTres from '../../assets/static/images/register-3.png';

const RegisterSlides = () => {

   return (
      <div className='SignUp__slide'>
         <h2>SIFAP <span> - Sistema de facturación para personas físicas con actividadempresarial.</span></h2>
         <ul>
            <li>
               <img src={RegisterUno} alt='Slide'/>
            </li>
            <li>
               <img src={RegisterDos} alt='Slide'/>
            </li>
            <li>
               <img src={RegisterTres} alt='Slide'/>
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

export default RegisterSlides;