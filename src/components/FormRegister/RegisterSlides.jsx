import React from 'react';

import '../../assets/styles/components/Register/RegisterSlides.scss';

import RegisterUno from '../../assets/static/images/register-1.png';
import RegisterDos from '../../assets/static/images/register-2.png';
import RegisterTres from '../../assets/static/images/register-3.png';

const RegisterSlides = () => {

   return (
      <div className='SignUp__slide'>
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
      </div>
   )
}

export default RegisterSlides;